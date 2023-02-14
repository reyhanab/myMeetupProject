'use strict';
const {Event} = require('../models')
let options = {validate:true};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const fields = [
  {
    groupId:1,
    venueId:1,
    name:'Sandboarding / Lake Michigan',
    description:'We will spend the first half the day Sandboarding on the sand dunes of Lake Michigan. The cost to rent a Sandboard for 4 hours is $25.',
    type:'In person',
    capacity:30,
    price:0,
    startDate:"2023-10-19 10:00:00",
    endDate:"2023-10-19 17:00:00",
    previewImage:"https://cdn-imgix.headout.com/media/images/d0b3ffa8c115ddbe93510b20b8074da1-18604-dubai-dune-bashing---sand-boarding-desert-safari-dubai-02.jpg"
  },
  {
    groupId:2,
    venueId:2,
    name:'Friday Night Brewery Series - Drafting Table Brewing Company',
    description:"Let's get together for some drinks.",
    type:'In person',
    capacity:20,
    price:0,
    startDate:"2023-11-19 20:00:00",
    endDate:"2023-11-19 22:00:00",
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
    startDate:"2023-11-19 20:00:00",
    endDate:"2023-11-19 22:00:00",
    previewImage:"https://www.verbalgoldblog.com//wp-content/uploads/2018/05/michael-discenza-199756-unsplash-900x934.jpg"
  },
  {
    groupId:4,
    venueId:4,
    name:'Yoga Tour To India',
    description:"Yoga tours by India provide a unique life-changing experience this tour for travelers in a very customize and colorful way this tour is mainly for yoga enthusiasts. Delhi, Jaipur, Fatehpur Sikri, Agra & Varanasi are the covering destination of this tour to make this tour more wonderful, to see the Glimpses of the river Ganges.",
    type:'In person',
    capacity:50,
    price:500,
    startDate:"2023-10-17 20:00:00",
    endDate:"2023-10-24 22:00:00",
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
    startDate:"2023-10-17 20:00:00",
    endDate:"2023-10-17 22:00:00",
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
    startDate:"2023-10-18 20:00:00",
    endDate:"2023-10-19 22:00:00",
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
    startDate:"2023-10-18 10:00:00",
    endDate:"2023-10-19 15:00:00",
    previewImage:"https://images.squarespace-cdn.com/content/v1/5949198746c3c411a954cea6/1635477158940-AG16SLTKZKCLO70NQL9E/FC0BF2E1-9900-4556-BB05-4A120BFC481E.jpeg?format=1000w"
  },
  {
    groupId:1,
    venueId:8,
    name:'Chat, meet people, and make friends',
    description:"This meeting is avalable in 10,000 cities in 195 countries Over seven Continent around the world.ATTENDEES UNDER THE AGE OF 18 MUST HAVE A GUARDIAN WITH THEM",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2023-10-18 10:00:00",
    endDate:"2023-10-19 15:00:00",
    previewImage:"https://images.giant-bicycles.com/npxjlknouzmeri0mnboz/preview.jpg"
  },
  {
    groupId:1,
    venueId:8,
    name:'Bike Prep',
    description:"Macomb Bike is hosting a free roadside maintenance class. They will discuss what simple tools to have at home for routine maintenance, and then get into what tools to carry with you on the bike in case of an emergency. ",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2023-02-18 10:00:00",
    endDate:"2023-02-19 15:00:00",
    previewImage:"https://clipart.world/wp-content/uploads/2021/05/Download-Clipart-Group-of-Friends.png"
  },
  {
    groupId:1,
    venueId:1,
    name:'Trivia',
    description:"Let's play some trivia over zoom! There will be a good mix of questions about entertainment, history, pop culture, geography, nature, music, whatever. You do not have to be good at trivia; this is just one fun thing to do while we do it! Prize: Fabio's voice on your home answering machine!",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2023-03-18 10:00:00",
    endDate:"2023-03-19 15:00:00",
    previewImage:"https://sportscommunity.com.au/wp-content/uploads/2017/07/shutterstock_340452164.jpg"
  },
  {
    groupId:1,
    venueId:1,
    name:'Warren Ski Club: Pub of the Month',
    description:"A monthly social event held on the third Tuesday of the month by the Warren and Youngstown Ski Clubs, being reintroduced in May, 2021 with the reopening of outdoor patios.",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2023-10-18 10:00:00",
    endDate:"2023-10-19 15:00:00",
    previewImage:"https://bluebirdbackcountry.com/wp-content/uploads/2021/03/5H2A4135-Edit-1024x683.jpg"
  },
  {
    groupId:1,
    venueId:1,
    name:"Hiking Utah's Big 5 Informational Session",
    description:"This meeting is avalable in 10,000 cities in 195 countries Over seven Continent around the world.ATTENDEES UNDER THE AGE OF 18 MUST HAVE A GUARDIAN WITH THEM",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2023-10-18 10:00:00",
    endDate:"2023-10-19 15:00:00",
    previewImage:"https://www.rei.com/dam/vagnini_181016_2024_hiking_beginners_hero_lg.jpg"
  },
  {
    groupId:1,
    venueId:1,
    name:'Travel 2023 Destinations!',
    description:"Our events are intended for both those who LOVE traveling the world and meeting others as well as those who are creatives or bloggers looking to build a location-independent, self-governed and enriching life in the interest of being able to wander freely and live a sustainable life outside of the typical 9-5. We welcome new and old faces alike...travelers...creative beings or BOTH!",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2023-04-18 10:00:00",
    endDate:"2023-04-19 15:00:00",
    previewImage:"https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg"
  }
  ,
  {
    groupId:1,
    venueId:1,
    name:'Backpacking for Beginners Virtual Workshop',
    description:"Ready to level up your day hiking adventures? Anxious to learn to camp for multiple days in the wilderness? Want to move from established campsites to the remote backcountry? We got you—and you can even wear your PJs. Learn how to backpack from the comfort of home (or wherever you get WiFi) with our live virtual online backpacking for beginners’ workshop, just for women! It’s the perfect introduction or refresher on how to go backpacking, taught by an expert Explorer Chick guide.",
    type:'Online',
    capacity:50,
    price:0,
    startDate:"2023-10-18 10:00:00",
    endDate:"2023-10-19 15:00:00",
    previewImage:"https://media.self.com/photos/5b048339fb856d7d3d02375d/1:1/w_3660,h_3660,c_limit/first-backpacking-trip.jpg"
  },
  {
    groupId:1,
    venueId:1,
    name:'Whitmore Lake Nature Preserve Hike',
    description:"This meeting is avalable in 10,000 cities in 195 countries Over seven Continent around the world.ATTENDEES UNDER THE AGE OF 18 MUST HAVE A GUARDIAN WITH THEM",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2023-05-18 10:00:00",
    endDate:"2023-05-19 15:00:00",
    previewImage:"https://d3qvqlc701gzhm.cloudfront.net/thumbs/d42bcc88960e7d101ea038afc049c2624f7ae7ac06541183b174f54c68bdcbd8-750.jpg"
  },
  {
    groupId:1,
    venueId:1,
    name:'Aqua Patrol',
    description:"Join us when we have Aqua Patrol-Underwater Photography session. During the winter months we will be diving at the Hartland High School pool. You'll have a chance to keep your skills up to date along with learning new skills for when you dive with us in the summer. Please bring your own bathing suit, towel, scuba mask, fins & snorkel. Rental SCUBA kits are available, please let us know your height & weight if you need a unit.",
    type:'In person',
    capacity:50,
    price:0,
    startDate:"2023-10-18 10:00:00",
    endDate:"2023-10-19 15:00:00",
    previewImage:"https://files.adventure-life.com/11/84/95/Snorkel/1300x820.webp"
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate(fields)

    // for (let item of fields){
    //   // const {groupId,venueId,name,description,type,capacity,price,startDate,endDate} = item
    //   await Event.create(item)
    // }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events')
  }
};
