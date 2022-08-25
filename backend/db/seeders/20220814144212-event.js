'use strict';
const {Event} = require('../models')
const fields = [
  {
    groupId:1,
    venueId:1,
    name:'Sandboarding / Lake Michigan',
    description:'We will spend the first half the day Sandboarding on the sand dunes of Lake Michigan. The cost to rent a Sandboard for 4 hours is $25.',
    type:'Online',
    capacity:30,
    price:25,
    startDate:"2022-09-19 20:00:00",
    endDate:"2022-09-20 22:00:00"
  },
  {
    groupId:2,
    venueId:2,
    name:'Friday Night Brewery Series - Drafting Table Brewing Company',
    description:"Let's get together for some drinks.",
    type:'In person',
    capacity:20,
    price:0,
    startDate:"2022-11-19 20:00:00",
    endDate:"2022-11-19 22:00:00"
  },
  {
    groupId:3,
    venueId:3,
    name:'Book Club 1! Midnight Library by Matt Haig',
    description:"How it works: We just meet once at the end! All are welcome, even if you haven't finished (or started) the book",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2022-10-17 20:00:00",
    endDate:"2022-10-17 22:00:00"
  },
  {
    groupId:4,
    venueId:4,
    name:'Book Club 2! Midnight Library',
    description:"How it works: We just meet once at the end! All are welcome, even if you haven't finished (or started) the book",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2022-10-17 20:00:00",
    endDate:"2022-10-17 22:00:00"
  },
  {
    groupId:5,
    venueId:5,
    name:'Book Club 3!',
    description:"How it works: We just meet once at the end! All are welcome, even if you haven't finished (or started) the book",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2022-10-17 20:00:00",
    endDate:"2022-10-17 22:00:00"
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate(fields, {validate:true})

    // for (let item of fields){
    //   // const {groupId,venueId,name,description,type,capacity,price,startDate,endDate} = item
    //   await Event.create(item)
    // }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events')
  }
};
