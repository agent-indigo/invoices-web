import sequelize from './sequelize.mjs'
import invoiceModel from '../models/invoiceModel.mjs'
import userModel from '../models/userModel.mjs'
const syncDb = async () => {
    try {
        await sequelize.authenticate()
        await invoiceModel.sync()
        await userModel.sync()
        console.log('Database synchronization successful.')
    } catch(error) {
        console.error(`Error synchronizing models:\n${error}`)
        process.exit(1)
    }
}
export default syncDb