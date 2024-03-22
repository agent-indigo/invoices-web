import 'dotenv/config'
import sequelize from './sequelize.mjs'
import invoiceModel from '../models/invoiceModel.mjs'
import userModel from '../models/userModel.mjs'
const connectToSQLdb = async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.error(`Error connecting to SQL database:\n${error}`)
        process.exit(1)
    }
    try {
        await invoiceModel.sync()
        await userModel.sync()
    } catch (error) {
        console.error(`Error synchronizing schema:\n${error}`)
        process.exit(1)
    }
    console.log('SQL database connection successful.')
    console.log('Schema successfully synchronized.')
    console.log(`DB name   : ${process.env.DB_NAME}`)
    console.log(`DB user   : ${process.env.DB_USER}`)
    console.log(`DB host   : ${process.env.DB_HOST}`)
    console.log(`DB port   : ${process.env.DB_PORT}`)
    console.log(`DB dialect: ${process.env.DB_DIALECT}`)
}
export default connectToSQLdb