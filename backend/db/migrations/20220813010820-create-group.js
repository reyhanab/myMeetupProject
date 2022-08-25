'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organizerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete:'cascade'
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      about: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      type: {
        type: Sequelize.STRING(10),
        allowNull:false
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      previewImage: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Groups');
  }
};