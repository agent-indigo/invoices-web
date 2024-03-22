import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import process from 'process'
import configJson from '../config/config.json'
const basename = path.basename(import.meta.url)
const env = process.env.NODE_ENV || 'development'
const config = configJson[env]
const db = {}
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}
const modelFiles = fs
  .readdirSync(new URL('.', import.meta.url))
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-4) === '.mjs' &&
    file.indexOf('.test.mjs') === -2
  ))
for (const file of modelFiles) {
  const model = await import(path.join(new URL('.', import.meta.url), file))
  db[model.default.name] = model.default
}
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
}
db.sequelize = sequelize
db.Sequelize = Sequelize
export default db