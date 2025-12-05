# 📋 Gestão de Atendimentos

Sistema completo de gerenciamento de atendimentos com backend em Node.js/Express e frontend em HTML/CSS/JavaScript puro. Totalmente traduzido para português.

## 🎯 Sobre o Projeto

A **Gestão de Atendimentos** é uma aplicação web que permite gerenciar atendimentos de uma organização, com suporte a:
- Múltiplos tipos de público (Pessoa Física, Jurídica, Interno)
- Múltiplas formas de atendimento (Presencial, Telefone, E-mail, Chat, etc.)
- Campos dinâmicos personalizáveis por tipo de atendimento
- Sistema de perfis e usuários com permissões
- Relatórios em CSV
- Autenticação de usuários

## 🏗️ Arquitetura do Projeto

```
gestao-atendimentos/
├── src/                              # Backend (Node.js/Express)
│   ├── config/
│   │   ├── database.js              # Configuração Sequelize
│   │   └── env.js                   # Variáveis de ambiente
│   ├── controllers/                 # Controladores (lógica de negócio)
│   │   ├── atendimentoController.js
│   │   ├── usuarioController.js
│   │   ├── perfilController.js
│   │   ├── tipoAtendimentoController.js
│   │   ├── formularioAtendimentoController.js
│   │   ├── tipoPublicoController.js
│   │   ├── campoTipoAtendimentoController.js
│   │   ├── relatorioController.js
│   │   └── autenticacaoController.js
│   ├── models/                      # Modelos de dados (Sequelize)
│   │   ├── atendimento.js
│   │   ├── usuario.js
│   │   ├── perfil.js
│   │   ├── tipoAtendimento.js
│   │   ├── formularioAtendimento.js
│   │   ├── tipoPublico.js
│   │   ├── campoTipoAtendimento.js
│   │   └── associacoes.js           # Relacionamentos entre modelos
│   ├── routes/                      # Rotas de API
│   │   ├── rotasAtendimento.js
│   │   ├── rotasUsuario.js
│   │   ├── rotasPerfil.js
│   │   ├── rotasFormularioAtendimento.js
│   │   ├── rotasTipoAtendimento.js
│   │   ├── rotasTipoPublico.js
│   │   ├── rotasCampoTipoAtendimento.js
│   │   ├── rotasRelatorio.js
│   │   └── rotasAutenticacao.js
│   ├── view/                        # Frontend (HTML/CSS/JS)
│   │   └── projeto-atendimentos-frontend/
│   │       ├── index.html           # Página de login
│   │       ├── menu.html            # Menu principal
│   │       ├── atendimento.html     # Gerenciar atendimentos
│   │       ├── usuarios.html        # Gerenciar usuários
│   │       ├── campos.html          # Gerenciar campos dinâmicos
│   │       ├── formulario.html      # Gerenciar formulários
│   │       ├── relatorios.html      # Gerar relatórios
│   │       ├── criar_usuario.html   # Criar novo usuário
│   │       ├── assets/
│   │       │   ├── css/             # Estilos (CSS)
│   │       │   └── js/              # Scripts JavaScript
│   │       └── ...
│   └── server.js                    # Servidor principal
├── package.json                     # Dependências npm
├── database.sql                     # Script SQL do banco
├── .env                            # Variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git
└── README.md                       # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL2** - Driver MySQL
- **dotenv** - Gerenciamento de variáveis de ambiente
- **json2csv** - Conversão de JSON para CSV
- **CORS** - Controle de requisições cross-origin
- **nodemon** - Auto-reload em desenvolvimento

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilos responsivos
- **JavaScript Puro** - Sem frameworks (vanilla JS)
- **Fetch API** - Requisições HTTP

### Banco de Dados
- **MySQL** - SGBD relacional
- **InnoDB** - Engine com suporte a Foreign Keys

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (vem com Node.js)
- **MySQL Server** (v5.7+) - [Download](https://dev.mysql.com/downloads/mysql/)

### Verificar instalação:
```powershell
node --version
npm --version
mysql --version
```

## 🚀 Como Executar

### 1. Clonar/Preparar o Repositório

```powershell
# Navegar até a pasta do projeto
cd c:\Users\seu_usuario\Desktop\gestao_atendimentos-main

# Ou criar um novo clone se necessário
git clone https://github.com/amandagss11/gestao_atendimentos.git
cd gestao_atendimentos
```

### 2. Instalar Dependências

```powershell
npm install
```

### 3. Configurar o Banco de Dados

#### Opção A: Executar script SQL (recomendado)

```powershell
# No terminal PowerShell (substituir credentials):
mysql -u root -p < database.sql

# Ou dentro do MySQL:
mysql -u root -p
source database.sql;
```

#### Opção B: Deixar Sequelize criar automaticamente

O Sequelize sincronizará os modelos ao iniciar o servidor (se `.env` estiver correto).

### 4. Configurar Variáveis de Ambiente

Edite o arquivo `.env` com suas credenciais do MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=gestao_atendimentos
PORT=3000
NODE_ENV=development
```

### 5. Iniciar o Servidor

```powershell
# Modo desenvolvimento (com auto-reload)
npm run dev

# Ou modo produção
npm start
```

**Saída esperada:**
```
[dotenv@17.2.3] injecting env (5) from .env
 Conexão com o banco de dados MySQL estabelecida com sucesso!
Tabelas e Associações sincronizadas.
 Servidor rodando em http://localhost:3000
```

### 6. Acessar a Aplicação

Abra seu navegador em:
```
http://localhost:3000
```

## 🔐 Login Padrão

Após executar o `database.sql`, não há usuários pré-criados. **Você precisa criar o primeiro usuário via API** ou banco de dados:

### Criar primeiro usuário (PowerShell):

```powershell
$body = @{
    name = "Admin"
    email = "admin@exemplo.com"
    password = "123456"
    profile_id = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/usuarios" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

Depois fazer login com:
- **E-mail:** admin@exemplo.com
- **Senha:** 123456

## 📡 Endpoints da API

Todos os endpoints estão sob `/api/`:

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/autenticacao` | Login do usuário |

### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Listar todos os usuários |
| POST | `/api/usuarios` | Criar novo usuário |
| GET | `/api/usuarios/:id` | Obter usuário por ID |

### Perfis
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/perfis` | Listar todos os perfis |
| POST | `/api/perfis` | Criar novo perfil |
| GET | `/api/perfis/:id` | Obter perfil por ID |
| PUT | `/api/perfis/:id` | Atualizar perfil |
| DELETE | `/api/perfis/:id` | Deletar perfil |

### Atendimentos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/atendimentos` | Listar atendimentos |
| POST | `/api/atendimentos` | Registrar novo atendimento |

### Formulários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/formularios` | Listar formulários |
| POST | `/api/formularios` | Criar formulário |
| PUT | `/api/formularios/:id` | Atualizar formulário |
| DELETE | `/api/formularios/:id` | Deletar formulário |

### Tipos de Atendimento
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tipos-atendimento` | Listar tipos |
| POST | `/api/tipos-atendimento` | Criar tipo |
| PUT | `/api/tipos-atendimento/:id` | Atualizar tipo |
| DELETE | `/api/tipos-atendimento/:id` | Deletar tipo |

### Tipos de Público
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/tipos-publicos` | Listar públicos |
| POST | `/api/tipos-publicos` | Criar público |
| PUT | `/api/tipos-publicos/:id` | Atualizar público |
| DELETE | `/api/tipos-publicos/:id` | Deletar público |

### Campos Dinâmicos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/campos-tipo` | Listar campos |
| POST | `/api/campos-tipo` | Criar campo |

### Relatórios
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/relatorios/atendimentos-csv` | Exportar CSV de atendimentos |

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

**profiles** (Perfis de usuário)
- id_profile (INT, PK)
- name (VARCHAR, UNIQUE)
- permissions (TEXT)

**users** (Usuários)
- id_user (INT, PK)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- is_active (BOOLEAN)
- profile_id (INT, FK)

**public_types** (Tipos de público)
- id_public (INT, PK)
- name (VARCHAR, UNIQUE)
- description (TEXT)

**attendance_forms** (Formas de atendimento)
- id_form (INT, PK)
- name (VARCHAR, UNIQUE)

**attendance_types** (Tipos de atendimento)
- id_attendance_type (INT, PK)
- name (VARCHAR)
- description (TEXT)
- public_type_id (INT, FK)

**attendance_type_fields** (Campos dinâmicos)
- id_field (INT, PK)
- label (VARCHAR)
- field_name (VARCHAR)
- field_type (ENUM: text, number, date, textarea, select)
- is_required (BOOLEAN)
- attendance_type_id (INT, FK)

**attendances** (Atendimentos)
- id_attendance (INT, PK)
- user_id (INT, FK)
- attendance_form_id (INT, FK)
- public_type_id (INT, FK)
- attendance_type_id (INT, FK)
- dynamic_data (JSON)
- summary (TEXT)
- is_resolved (BOOLEAN)

## 🎨 Frontend

O frontend é construído com **HTML/CSS/JavaScript puro** (sem frameworks).

### Páginas Disponíveis

1. **Login** (`index.html`) - Autenticação
2. **Menu** (`menu.html`) - Painel principal
3. **Atendimentos** (`atendimento.html`) - Criar/visualizar atendimentos
4. **Usuários** (`usuarios.html`) - Gerenciar usuários
5. **Formulários** (`formulario.html`) - Gerenciar formulários
6. **Campos** (`campos.html`) - Configurar campos dinâmicos
7. **Relatórios** (`relatorios.html`) - Exportar dados

### Fluxo de Navegação

```
Login → Menu Principal
        ├── Criar Atendimento
        ├── Listar Atendimentos
        ├── Gerenciar Usuários
        ├── Gerenciar Formulários
        ├── Configurar Campos
        └── Gerar Relatórios
```

## 🔄 Fluxo de Dados

```
Frontend (HTML/JS)
    ↓
Fetch API
    ↓
Express Routes
    ↓
Controllers (Lógica)
    ↓
Sequelize Models
    ↓
MySQL Database
```

## 📝 Exemplos de Uso

### Criar um Atendimento

```javascript
const novoAtendimento = {
    user_id: 1,
    attendance_form_id: 1,      // Presencial
    public_type_id: 1,           // Pessoa Física
    attendance_type_id: 1,       // Tipo específico
    summary: "Cliente solicitou informações sobre serviço",
    dynamic_data: {
        "campo_custom": "valor"
    }
};

fetch('http://localhost:3000/api/atendimentos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoAtendimento)
})
.then(res => res.json())
.then(data => console.log('Atendimento criado:', data));
```

### Fazer Login

```javascript
const credenciais = {
    email: "admin@exemplo.com",
    password: "123456"
};

fetch('http://localhost:3000/api/autenticacao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciais)
})
.then(res => res.json())
.then(data => {
    if (data.user) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'menu.html';
    }
});
```

### Gerar Relatório CSV

```javascript
// Parâmetros opcionais
const params = new URLSearchParams({
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    publicTypeId: 1
});

window.location.href = `http://localhost:3000/api/relatorios/atendimentos-csv?${params}`;
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```powershell
npm install
```

### Erro: "Connection refused" (Banco)
```powershell
# Verificar se MySQL está rodando
# Windows:
net start MySQL80

# Ou iniciar manualmente pelo painel de controle
```

### Erro: "Access denied" para MySQL
- Verifique credenciais em `.env`
- Certifique-se de que o usuário MySQL tem permissões corretas

### Porta 3000 já em uso
```powershell
# Mudar porta em .env
PORT=3001

# Ou finalizar processo anterior
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Banco vazio após rodar script
```powershell
# Verificar se as tabelas foram criadas
mysql -u root -p
USE gestao_atendimentos;
SHOW TABLES;
```

## 📦 Scripts npm

```powershell
npm run dev      # Iniciar com nodemon (desenvolvimento)
npm start        # Iniciar servidor (produção)
npm install      # Instalar dependências
```

## 🔐 Segurança

⚠️ **Atenção:** Este é um projeto de exemplo educacional. Para produção:

- [ ] Implementar JWT (JSON Web Tokens) para autenticação
- [ ] Hash de senhas com bcrypt
- [ ] Validação de entrada mais rigorosa
- [ ] Rate limiting
- [ ] HTTPS/SSL
- [ ] Variáveis de ambiente seguras

## 📄 Licença

Este projeto é de uso educacional. Sinta-se livre para modificar e distribuir.

## 👨‍💻 Desenvolvimento

### Recomendações
- Use VS Code ou similar
- Instale extensão MySQL para gerenciar banco
- Use Postman ou Insomnia para testar API
- Ative console do navegador (F12) para debug

### Próximas Melhorias
- [ ] Implementar testes unitários
- [ ] Adicionar autenticação JWT
- [ ] Melhorar UI/UX com framework CSS
- [ ] Adicionar paginação nos resultados
- [ ] Implementar permissões por perfil
- [ ] Adicionar logs estruturados

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte o arquivo `SETUP_BANCO_DADOS.md`
3. Verifique os logs do servidor (terminal)
4. Use console do navegador (F12)

---

**Desenvolvido em português 🇧🇷**

Última atualização: Dezembro 2025
