export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
        pk: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notContains: {
                    args: [' '],
                    msg: 'Spaces prohibited.'
                }
            }
        },
        shadow: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('root', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    })
    await queryInterface.addConstraint('users', {
        type: 'unique',
        fields: ['role'],
        where : {
            role: 'root'
        },
        name: 'unique_root_constraint'
    })
    await queryInterface.addConstraint('users', {
        type: 'check',
        fields: ['role'],
        where: {
            role: ['root', 'user']
        },
        name: 'valid_role_constraint'
    })
}
export const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
}