import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Perfil = sequelize.define('Perfil', {
    id_profile: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_profile' 
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    permissions: { 
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'READ_ATTENDANCE' 
    }
}, {
    tableName: 'profiles', 
    timestamps: true 
});

export default Perfil;
