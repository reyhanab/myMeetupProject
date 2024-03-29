'use strict';
const bcrypt = require('bcryptjs')
const {User} = require('../models')
let options = {validate : true, tablename : "users"};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object]
}
const fields= [
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
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(fields)
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("Users");
  }
};
