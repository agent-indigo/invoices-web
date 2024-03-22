export const up = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
        pk: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vendor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        subtotal: {
            type: Sequelize.DECIMAL(7, 2),
            allowNull: false,
            defaultValue: 0.0
        },
        hst: {
            type: Sequelize.DECIMAL(6, 2),
            allowNull: false,
            defaultValue: 0.0
        },
        total: {
            type: Sequelize.DECIMAL(7, 2),
            allowNull: false,
            defaultValue: 0.0
        },
        invoiceId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });
}
export const down = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoices');
}