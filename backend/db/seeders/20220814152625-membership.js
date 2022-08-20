'use strict';
const {Membership} = require('../models')
const fields=[
  {
    memberId: 1,
    groupId:1,
    status:'host'
  },
  {
    memberId: 2,
    groupId:2,
    status:'host'
  },
  {
    memberId: 3,
    groupId:3,
    status:'host'
  },
  {
    memberId: 1,
    groupId:3,
    status:'member'
  },
  {
    memberId: 2,
    groupId:1,
    status:'member'
  },
  {
    memberId: 3,
    groupId:2,
    status:'co-host'
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Memberships', fields, {validate:true})
    for (let item of fields){
      const {memberId,groupId,status} = item
      await Membership.create({memberId,groupId,status})
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memberships')
  }
};
