-- Script de criação do banco de dados para Gestão de Atendimentos
-- Executar antes de iniciar o servidor Node.js

CREATE DATABASE IF NOT EXISTS gestao_atendimentos;
USE gestao_atendimentos;

-- Tabela de Perfis
CREATE TABLE IF NOT EXISTS profiles (
    id_profile INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    permissions TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    profile_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id_profile) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Tipos de Público
CREATE TABLE IF NOT EXISTS public_types (
    id_public INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Formas de Atendimento
CREATE TABLE IF NOT EXISTS attendance_forms (
    id_form INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Tipos de Atendimento
CREATE TABLE IF NOT EXISTS attendance_types (
    id_attendance_type INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    public_type_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (public_type_id) REFERENCES public_types(id_public) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Campos de Tipos de Atendimento
CREATE TABLE IF NOT EXISTS attendance_type_fields (
    id_field INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    field_type ENUM('text', 'number', 'date', 'textarea', 'select') NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    attendance_type_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (attendance_type_id) REFERENCES attendance_types(id_attendance_type) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_field_per_type (field_name, attendance_type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de Atendimentos
CREATE TABLE IF NOT EXISTS attendances (
    id_attendance INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    attendance_form_id INT NOT NULL,
    public_type_id INT NOT NULL,
    attendance_type_id INT NOT NULL,
    dynamic_data JSON,
    summary TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_user) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (attendance_form_id) REFERENCES attendance_forms(id_form) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (public_type_id) REFERENCES public_types(id_public) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (attendance_type_id) REFERENCES attendance_types(id_attendance_type) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para melhor performance
CREATE INDEX idx_users_profile_id ON users(profile_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_attendance_types_public_type_id ON attendance_types(public_type_id);
CREATE INDEX idx_attendance_type_fields_attendance_type_id ON attendance_type_fields(attendance_type_id);
CREATE INDEX idx_attendances_user_id ON attendances(user_id);
CREATE INDEX idx_attendances_form_id ON attendances(attendance_form_id);
CREATE INDEX idx_attendances_public_type_id ON attendances(public_type_id);
CREATE INDEX idx_attendances_attendance_type_id ON attendances(attendance_type_id);
CREATE INDEX idx_attendances_created_at ON attendances(createdAt);

-- Dados iniciais (perfis padrão)
INSERT INTO profiles (name, permissions) VALUES
('Administrador', 'CREATE_USER,READ_ATTENDANCE,CREATE_ATTENDANCE,UPDATE_ATTENDANCE,DELETE_ATTENDANCE,CREATE_PROFILE,READ_PROFILE,UPDATE_PROFILE,DELETE_PROFILE'),
('Operador', 'READ_ATTENDANCE,CREATE_ATTENDANCE,UPDATE_ATTENDANCE'),
('Gestor', 'READ_ATTENDANCE,CREATE_ATTENDANCE,UPDATE_ATTENDANCE,READ_PROFILE')
ON DUPLICATE KEY UPDATE permissions = VALUES(permissions);

-- Dados iniciais (tipos de público)
INSERT INTO public_types (name, description) VALUES
('Pessoa Física', 'Atendimento direcionado a pessoa física'),
('Pessoa Jurídica', 'Atendimento direcionado a empresa ou organização'),
('Interno', 'Atendimento interno da organização')
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Dados iniciais (formas de atendimento)
INSERT INTO attendance_forms (name) VALUES
('Presencial'),
('Telefone'),
('E-mail'),
('Chat'),
('Presencial - Agendado')
ON DUPLICATE KEY UPDATE name = VALUES(name);

COMMIT;

-- Mensagem de sucesso
SELECT 'Banco de dados criado com sucesso!' AS resultado;
