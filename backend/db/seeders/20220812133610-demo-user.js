'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {
        email: 'user1@user.io',
        firstName: 'Reyhaneh',
        lastName: 'Abdollahi',
        password: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'John',
        lastName: 'smith',
        password: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: 'Alice',
        lastName: 'Smith',
        password: bcrypt.hashSync('password3')
      }
    ], {validate:true})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'] }
    });
  }
};
