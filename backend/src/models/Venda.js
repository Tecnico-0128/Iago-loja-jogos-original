import  { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Venda = sequelize.define('Venda',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cpf_cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'venda'
})

export default Venda