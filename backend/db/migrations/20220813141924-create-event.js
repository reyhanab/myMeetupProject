'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Groups',
          key:'id'
        },
        onDelete:'cascade'
      },
      venueId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        // references:{
        //   model:'Venues',
        //   key:'id'
        // },
        // onDelete:'cascade'
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      type: {
        type: Sequelize.STRING,
        allowNull:false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      previewImage: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Events');
  }
};