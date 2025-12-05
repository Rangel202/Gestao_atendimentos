import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FormularioAtendimento = sequelize.define('FormularioAtendimento', {
    id_form: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_form'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'attendance_forms',
    timestamps: true 
});

export default FormularioAtendimento;
