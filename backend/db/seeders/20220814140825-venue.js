'use strict';
const {Venue} = require ('../models')
const fields = [
  {
    groupId: 1,
    address: "49438 North Trail",
    city: "Royal Oak",
    state:"MI",
    lat:4.7645358,
    lng:15.573032
  },
  {
  groupId: 2,
  address: "14741 23 mile Road",
  city: "Royal Oak",
  state:"MI",
  lat:37.7645358,
  lng:-122.473032
},
{
  groupId: 3,
  address: "12032 Red Arrow Hwy",
  city: "Utica",
  state:"MI",
  lat:56.7645358,
  lng:122.573032
},
{
  groupId: 4,
  address: "49438 South Trail",
  city: "Rochester",
  state:"MI",
  lat:13.7645358,
  lng:15.573032
},
{
  groupId: 5,
  address: "49438 Pontiac Trail",
  city: "Detroit",
  state:"MI",
  lat:-10.7645358,
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
