import 'dotenv/config'
import Sequelize from 'sequelize'
const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            prefer: true
        }
    },
    logging: process.env.SHOW_SQL.toLowerCase() === 'true'
})
export default sequelize