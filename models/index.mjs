import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import sequelize from '../utilities/sequelize.mjs'
const basename = path.basename(import.meta.url)
const db = {}
const modelFiles = fs
  .readdirSync(new URL('.', import.meta.url))
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-4) === '.mjs' &&
    file.indexOf('.test.mjs') === -1
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