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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fdabuka.de%2Fitinerary%2Fsandboarding-in-kusur-al-arab-fayoum%2F&psig=AOvVaw03DqyPW_b8N8Qf8V5z6CdF&ust=1665421279581000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJD3_e_P0_oCFQAAAAAdAAAAABAU"
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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thedrinksbusiness.com%2F2020%2F04%2Fthe-10-largest-craft-breweries-in-the-us-2020%2F&psig=AOvVaw04Tz4M2MU_JUoecFDJyuf3&ust=1665421455474000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPCK68PQ0_oCFQAAAAAdAAAAABAJ"
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
    previewImage:"https://www.google.com/url?sa=i&url=http%3A%2F%2Flandyachtlimos.com%2Flimoservice%2Ftag%2Fladies-night-out&psig=AOvVaw3yU_mJceZJ8OfpH762niVY&ust=1665421499612000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPjH-NjQ0_oCFQAAAAAdAAAAABAF"
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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tourmyindia.com%2Fblog%2Fyoga-destinations-india-rejuvenate%2F&psig=AOvVaw3ZaGzmT_pWezT0h1IYUCXx&ust=1665421542221000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIDDnu3Q0_oCFQAAAAAdAAAAABAF"
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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.clipartlogo.com%2Ffree%2Fbook-club.html&psig=AOvVaw3l2IoP2WWR5BdlOrdV0r6L&ust=1665421670183000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPjSparR0_oCFQAAAAAdAAAAABAO"
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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.outsideonline.com%2Foutdoor-adventure%2Fbiking%2Feverything-you-always-wanted-to-know-about-gravel-cycling-but-were-afraid-to-ask%2F&psig=AOvVaw1_DLRQGLJ-92rtSVd78Lg5&ust=1665421744622000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOCnys3R0_oCFQAAAAAdAAAAABAE"
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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.yelp.com%2Fbiz%2Fplanet-rock-madison-heights-madison-heights%3Fstart%3D20&psig=AOvVaw3fxpvMAwXCq3qYX6aUVST7&ust=1665423388681000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOjg293X0_oCFQAAAAAdAAAAABAF"
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
    previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Finternational-friends-multiethnic-friendship-vector-30239564&psig=AOvVaw2c3hNS9G_z8netztgYKOSB&ust=1665423446533000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPj-l_nX0_oCFQAAAAAdAAAAABAF"
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
