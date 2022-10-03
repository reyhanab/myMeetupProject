'use strict';

const {Group} = require('../models')
const fields = [{
  organizerId: 1,
  name: 'Metro Detroit Outdoors',
  about:"Do you like being outdoors and active? Give us a try. We are outside four seasons of the year with lots of hiking, some canoeing, camping and x-c skiing.  ",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'Michigan',
  previewImage: 'http://localhost:8080/groups/metro-detroit.jpg'
},
{
  organizerId: 2,
  name: 'The Weekenders',
  about:"This group is for young people (20's & 30's) looking for a little somethin' on the weekends other than the usual grind. This is also a shout out to all of you who are new in town and are looking to meet people! ",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'Michigan',
  previewImage: 'http://localhost:8080/groups/weekenders.jpg'
},
{
  organizerId: 3,
  name: 'Ladies Night 25-45',
  about:"This group is for women ages 25 to 45 who are interested in making new friendships.",
  type:'In person',
  private:true,
  city:'Utica',
  state:'Michigan',
  previewImage:"http://localhost:8080/groups/ladies-night.jpg"
},
{
  organizerId: 1,
  name: 'Detroit Travel Community - Tripsider Adventure Tours',
  about:"Are you interested in exploring the world, but uncertain about where to start or who to go with? Find travel mates in our community!We are pleased to welcome you to The Detroit Travel Community, powered by Tripsider! At our community, we use a laid-back approach to small group travel that feels more like exploring the world with old friends than anything else. Our less-restricting itineraries mean spontaneous, fun-filled opportunities to capture the best of what every spot along the way has to offer.",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'http://localhost:8080/groups/travel.jpg'
},
{
  organizerId: 1,
  name: 'Outdoor Afro',
  about:"Outdoor Afro is a community that reconnects and centers the Black experience with natural spaces and one another through recreational activities such as camping, hiking, biking, birding, fishing, gardening, skiing — and more! We use social media to create interest communities, events, and to help shift the visual representation of who gets outdoors. Here is where you can start (or expand) connecting with local Black people who share your outdoor interests and aspirations!",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'http://localhost:8080/groups/afro.jpg'
},
{
  organizerId: 1,
  name: 'Road Cycling SE Michigan',
  about:"This group is for road cyclists to meet together for both organized and spontaneous rides. It will primarily post League of Michigan Bicyclists events and events of affiliated bicycle clubs. All rides require you to wear a helmet approved for bicycle riding. The START time posted is the time the group LEAVES the parking lot. Please arrive early enough so that you are ON your bike and READY TO ROLL 5 minutes before the start of the ride. Please note that member clubs expect you to be able to MAINTAIN the posted pace of the ride. If you have a 30 pound hybrid and walk your bike up hills, don't show up for a 18-20 mph pace ride and expect everyone to slow down so you can keep up. You should carry all tools and parts needed to repair your own flats.",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'http://localhost:8080/groups/cycling.jpg'
},
{
  organizerId: 1,
  name: 'Metro Detroit Rock Climbing!',
  about:"Climbing works best with a partner! Whether you're new to climbing or been around a bit let's do some climbing. We would love to meet up with you to climb.We hold events at 2 indoor locations: Planet Rock in Madison Heights and DYNO Detroit in Eastern Market.Both locations offer gear rental and day passes, punch passes or membership pricing to climb the day of our event.",
  type:'In person',
  private:true,
  city:'Saint Clair Shores',
  state:'Michigan',
  previewImage: 'http://localhost:8080/groups/rock-climbing.jpg'
}
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate(fields,{validate:true})
    // for (let item of fields){
    //   const {organizerId,name,about,type,private,city,state} = item;
    //   await Group.create({organizerId,name,about,type,private,city,state})
    // }
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Groups')
  }
};
