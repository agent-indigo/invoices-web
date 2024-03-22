import {Model, DataTypes} from 'sequelize'
import sequelize from '../utilities/sequelize.mjs'
class invoiceModel extends Model {}
invoiceModel.init({
    pk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    vendor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    hst: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    total: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    invoiceId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'invoice',
    tableName: 'invoices',
    timestamps: true
})
export default invoiceModel