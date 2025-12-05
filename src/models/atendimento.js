import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './usuario.js'; 
import FormularioAtendimento from './formularioAtendimento.js'; 
import TipoPublico from './tipoPublico.js'; 
import TipoAtendimento from './tipoAtendimento.js'; 

const Atendimento = sequelize.define('Atendimento', {
    id_attendance: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_attendance'
    },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Usuario, key: 'id_user' }
    },
    attendance_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: FormularioAtendimento, key: 'id_form' }
    },
    public_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: TipoPublico, key: 'id_public' }
    },
    attendance_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: TipoAtendimento, key: 'id_attendance_type' }
    },
    
    dynamic_data: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    summary: { 
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_resolved: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'attendances',
    timestamps: true 
});

export default Atendimento;
