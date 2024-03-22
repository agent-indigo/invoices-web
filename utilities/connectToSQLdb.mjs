import 'dotenv/config'
import sequelize from './sequelize.mjs'
const connectToSQLdb = async () => {
    try {
        await sequelize.authenticate()
        console.log('SQL database connection successful.')
        console.log(`DB name   : ${process.env.DB_NAME}`)
        console.log(`DB user   : ${process.env.DB_USER}`)
        console.log(`DB host   : ${process.env.DB_HOST}`)
        console.log(`DB port   : ${process.env.DB_PORT}`)
        console.log(`DB dialect: ${process.env.DB_DIALECT}`)
    } catch (error) {
        console.error(`Error connecting to SQL database:\n${error}`)
        process.exit(1)
    }
}
export default connectToSQLdb