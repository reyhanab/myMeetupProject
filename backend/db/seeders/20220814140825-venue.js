'use strict';
const {Venue} = require ('../models')
const fields = [{
  groupId: 2,
  address: "14741 23 mile Road",
  city: "Shelby twp",
  state:"MI",
  lat:37.7645358,
  lng:-122.473032
},
{
  groupId: 3,
  address: "12032 Red Arrow Hwy",
  city: "Sawyer",
  state:"MI",
  lat:56.7645358,
  lng:122.573032
},
{
  groupId: 1,
  address: "49438 Pontiac Trail",
  city: "Wixom",
  state:"MI",
  lat:4.7645358,
  lng:15.573032
}]
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('Venues', fields, {validate:true})
    for (let item of fields){
      const {groupId,address,city,state,lat,lng} = item
      await Venue.create({groupId,address,city,state,lat,lng})
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues')
  }
};
