import  { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Cliente = sequelize.define('Cliente',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'cliente'
})

export default Cliente