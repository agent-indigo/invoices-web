import {Model, DataTypes} from 'sequelize'
import {sequelize} from '../utilities/SQLconnector.mjs'
class userModel extends Model {}
userModel.init({
    pk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shadow: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('root', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: true,
    hooks: {
        async beforeCreate(user) {
            try {
                if (user.role === 'root') {
                    const root = await userModel.findOne({where: {role: 'root'}})
                    if (root) throw new Error('There can be only one root user.')
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
})
export default userModel