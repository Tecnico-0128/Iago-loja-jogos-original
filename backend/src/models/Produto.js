import  { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Produto = sequelize.define('Produto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomep: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    preco: {
        type: DataTypes.REAL,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'produto'
})

export default Produto