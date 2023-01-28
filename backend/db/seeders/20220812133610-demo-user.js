'use strict';
const bcrypt = require('bcryptjs')

let options = {validate : true, tablename : "users"};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object]

}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options,[
      {
        email: 'user1@user.io',
        firstName: 'Reyhaneh',
        lastName: 'Abdollahi',
        password: bcrypt.hashSync('password1')
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
      },
      {
        email: 'user4@user.io',
        firstName: 'Don',
        lastName: 'Hall',
        password: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        firstName: 'Steve',
        lastName: 'Young',
        password: bcrypt.hashSync('password5')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['user1@user.io', 'user2@user.io', 'user3@user.io', 'user4@user.io', 'user5@user.io'] }
    }, options);
  }
};
