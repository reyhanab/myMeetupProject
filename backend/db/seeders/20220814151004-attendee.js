'use strict';
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
<<<<<<< HEAD
    userId:4,
    eventId:4,
    status:'member'
  },
  {
    userId:5,
=======
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
>>>>>>> dev
    eventId:5,
    status:'member'
  },
  {
<<<<<<< HEAD
    userId:1,
    eventId:4,
    status:'pending'
  },
  {
    userId:5,
    eventId:4,
    status:'pending'
  },
  {
    userId:4,
    eventId:1,
    status:'pending'
  },
  {
    userId:1,
    eventId:3,
=======
    userId:3,
    eventId:5,
>>>>>>> dev
    status:'member'
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
  //  await queryInterface.bulkInsert('Attendees', fields, {validate:true})
  for (let item of fields){
    const {userId,eventId,status} = item
    await Attendee.create({userId,eventId,status})
  }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attendees')
  }
};
