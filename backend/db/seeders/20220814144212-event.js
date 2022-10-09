'use strict';
const {Event} = require('../models')
const fields = [
  {
    groupId:1,
    venueId:1,
    name:'Sandboarding / Lake Michigan',
    description:'We will spend the first half the day Sandboarding on the sand dunes of Lake Michigan. The cost to rent a Sandboard for 4 hours is $25.',
    type:'In person',
    capacity:30,
    price:0,
    startDate:"2022-10-19 10:00:00",
    endDate:"2022-10-19 17:00:00",
    previewImage:"https://desertexpeditions.com.pe/wp-content/uploads/2017/04/SANDBOARD-LIMA-PERU-2.jpg"
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
    endDate:"2022-11-19 22:00:00",
    previewImage:"https://p2d7x8x2.stackpathcdn.com/content/uploads/2020/03/iStock-1040303026-640x425.jpg"
  },
  {
    groupId:3,
    venueId:3,
    name:'Friday Night Out',
    description:"Let's get together for some drinks.",
    type:'In person',
    capacity:20,
    price:0,
    startDate:"2022-11-19 20:00:00",
    endDate:"2022-11-19 22:00:00",
    previewImage:"https://www.citymyway.com/Upload/citymyway/35029_1561149943_46202194037.jpeg"
  },
  {
    groupId:4,
    venueId:4,
    name:'Yoga Tour To India',
    description:"Yoga tours by India provide a unique life-changing experience this tour for travelers in a very customize and colorful way this tour is mainly for yoga enthusiasts. Delhi, Jaipur, Fatehpur Sikri, Agra & Varanasi are the covering destination of this tour to make this tour more wonderful, to see the Glimpses of the river Ganges.",
    type:'In person',
    capacity:50,
    price:500,
    startDate:"2022-10-17 20:00:00",
    endDate:"2022-10-24 22:00:00",
    previewImage:"https://byo-storage.s3.ap-south-1.amazonaws.com/public/og-images/vwN8hJ0ZNqTuMPFftKdJVoHQxSgfxoAgIZj4QRiS.jpg"
  },
  {
    groupId:5,
    venueId:5,
    name:'Book Club! Midnight Library by Matt Haig',
    description:"How it works: We just meet once at the end! All are welcome, even if you haven't finished (or started) the book",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2022-10-17 20:00:00",
    endDate:"2022-10-17 22:00:00",
    previewImage:"https://image.cnbcfm.com/api/v1/image/104702698-GettyImages-583816330-book-club.jpg?v=1532563764"
  },
  {
    groupId:6,
    venueId:6,
    name:'Cycling in Eastern Serbia',
    description:"Join us in a virtual cycling tour in the Eastern Serbia and explore the slopes of Kucajske Mountain, history of coal mining in a tiny village of Resavica and visit fortified monastery Manasija with its Resavska School. It is a family friendly cycling tour 50km long. The area which we explore is the least populated region of Serbia, covered mainly with dense forests and undulated meadows. ",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2022-10-18 20:00:00",
    endDate:"2022-10-19 22:00:00",
    previewImage:"https://i.guim.co.uk/img/media/e81bc0125b1c4bc950c5515f6c0e454df8b3c7a5/0_555_8368_5019/master/8368.jpg?width=620&quality=85&auto=format&fit=max&s=d37382ce42c5db509ed58fc244e00b68"
  },
  {
    groupId:7,
    venueId:7,
    name:'Rock Climbing Planet Rock',
    description:"Come get your climb on! Whether you've never climbed or you're a pro, whether you want to boulder, top-rope or lead, we'll partner up and climb some walls.",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2022-10-18 10:00:00",
    endDate:"2022-10-19 15:00:00",
    previewImage:"https://images.squarespace-cdn.com/content/v1/5949198746c3c411a954cea6/1635477158940-AG16SLTKZKCLO70NQL9E/FC0BF2E1-9900-4556-BB05-4A120BFC481E.jpeg?format=1000w"
  },
  {
    groupId:8,
    venueId:8,
    name:'Chat, meet people, and make friends',
    description:"This meeting is avalable in 10,000 cities in 195 countries Over seven Continent around the world.ATTENDEES UNDER THE AGE OF 18 MUST HAVE A GUARDIAN WITH THEM",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2022-10-18 10:00:00",
    endDate:"2022-10-19 15:00:00",
    previewImage:"https://clipart.world/wp-content/uploads/2021/05/Download-Clipart-Group-of-Friends.png"
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
