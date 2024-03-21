import 'dotenv/config'
import Sequelize from 'sequelize'
export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
})
const SQLconnector = async () => {
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
export default SQLconnector