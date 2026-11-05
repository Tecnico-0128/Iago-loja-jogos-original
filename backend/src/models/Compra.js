import  { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Compra = sequelize.define('Compra',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produtoa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidadea: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'compra'
})

export default Compra