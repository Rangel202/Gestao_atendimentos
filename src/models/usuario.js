import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Perfil from './perfil.js';  

const Usuario = sequelize.define('Usuario', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_user' 
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255), 
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

    profile_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Perfil, 
            key: 'id_profile',
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
});

export default Usuario;
