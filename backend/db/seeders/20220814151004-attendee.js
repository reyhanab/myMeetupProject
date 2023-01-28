'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const {Attendee} = require('../models')
const fields = [
  {
    userId:1,
    eventId:1,
    status:'member'
  },
  {
    userId:2,
    eventId:2,
    status:'member'
  },
  {
    userId:3,
    eventId:3,
    status:'waitlist'
  },
  {
    userId:1,
    eventId:2,
    status:'member'
  },
  {
    userId:1,
    eventId:2,
    status:'member'
  },
  {
    userId:3,
    eventId:5,
    status:'member'
  },
  {
    userId:3,
    eventId:5,
    status:'member'
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
  //  await queryInterface.bulkInsert('Attendees', fields, {validate:true})
  for (let item of fields){
    const {userId,eventId,status} = item
    await Attendee.create({userId,eventId,status}, options)
  }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attendees', options)
  }
};
