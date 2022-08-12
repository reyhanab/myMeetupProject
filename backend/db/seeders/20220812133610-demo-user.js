'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {
        email: 'demo@user.io',
        firstName: 'Rey',
        lastName: 'Ab',
        password: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Reyhaneh',
        lastName: 'Abdd',
        password: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Reyhan',
        lastName: 'Abddd',
        password: bcrypt.hashSync('password3')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'] }
    });
  }
};
