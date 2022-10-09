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
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.muscleandfitness.com%2Fworkouts%2Fworkout-tips%2F5-outdoor-activities-fire-your-metabolism-and-calm-your-mind%2F&psig=AOvVaw0UIvYN1oaTZhGqny74syIi&ust=1665420016652000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCODJ9pXL0_oCFQAAAAAdAAAAABAE'
},
{
  organizerId: 2,
  name: 'The Weekenders',
  about:"This group is for young people (20's & 30's) looking for a little somethin' on the weekends other than the usual grind. This is also a shout out to all of you who are new in town and are looking to meet people! ",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'Michigan',
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.visitvirginiabeach.com%2Fexplore%2Foutdoor-activities%2F&psig=AOvVaw0UIvYN1oaTZhGqny74syIi&ust=1665420016652000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCODJ9pXL0_oCFQAAAAAdAAAAABAJ'
},
{
  organizerId: 3,
  name: 'Ladies Night 25-45',
  about:"This group is for women ages 25 to 45 who are interested in making new friendships.",
  type:'In person',
  private:true,
  city:'Utica',
  state:'Michigan',
  previewImage:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fsecretmiami.com%2Fbest-ladies-night-miami%2F&psig=AOvVaw09J0meUrl6uo2ICfm7537p&ust=1665420558979000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJjisZjN0_oCFQAAAAAdAAAAABAE"
},
{
  organizerId: 1,
  name: 'Detroit Travel Community - Tripsider Adventure Tours',
  about:"Are you interested in exploring the world, but uncertain about where to start or who to go with? Find travel mates in our community!We are pleased to welcome you to The Detroit Travel Community, powered by Tripsider! At our community, we use a laid-back approach to small group travel that feels more like exploring the world with old friends than anything else. Our less-restricting itineraries mean spontaneous, fun-filled opportunities to capture the best of what every spot along the way has to offer.",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.langschwander.com%2Fnews%2F2016%2F12%2F14%2Fwhy-its-essential-you-travel-how-travel-tourism-boost-global-economics&psig=AOvVaw3buuryToTcqCnKmAEASdpY&ust=1665420617039000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLCe8bPN0_oCFQAAAAAdAAAAABAE'
},
{
  organizerId: 1,
  name: 'Outdoor Afro',
  about:"Outdoor Afro is a community that reconnects and centers the Black experience with natural spaces and one another through recreational activities such as camping, hiking, biking, birding, fishing, gardening, skiing — and more! We use social media to create interest communities, events, and to help shift the visual representation of who gets outdoors. Here is where you can start (or expand) connecting with local Black people who share your outdoor interests and aspirations!",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F283515739030619621%2F&psig=AOvVaw3ArKnOZjcNyVokR0SBCBBx&ust=1665420651697000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJiOxsTN0_oCFQAAAAAdAAAAABAR'
},
{
  organizerId: 1,
  name: 'Road Cycling SE Michigan',
  about:"This group is for road cyclists to meet together for both organized and spontaneous rides. It will primarily post League of Michigan Bicyclists events and events of affiliated bicycle clubs. All rides require you to wear a helmet approved for bicycle riding. The START time posted is the time the group LEAVES the parking lot. Please arrive early enough so that you are ON your bike and READY TO ROLL 5 minutes before the start of the ride. Please note that member clubs expect you to be able to MAINTAIN the posted pace of the ride. If you have a 30 pound hybrid and walk your bike up hills, don't show up for a 18-20 mph pace ride and expect everyone to slow down so you can keep up. You should carry all tools and parts needed to repair your own flats.",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcentro-innato.com%2Fajuste-quiropractico%2F%3Fen%3D5.3.1594027.1.25.85.starting%2Bout%2Broad%2Bcycling&psig=AOvVaw25iBS7K0osHFayKQqtHXCW&ust=1665420700945000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPjcg9zN0_oCFQAAAAAdAAAAABAI'
},
{
  organizerId: 1,
  name: 'Metro Detroit Rock Climbing!',
  about:"Climbing works best with a partner! Whether you're new to climbing or been around a bit let's do some climbing. We would love to meet up with you to climb.We hold events at 2 indoor locations: Planet Rock in Madison Heights and DYNO Detroit in Eastern Market.Both locations offer gear rental and day passes, punch passes or membership pricing to climb the day of our event.",
  type:'In person',
  private:true,
  city:'Saint Clair Shores',
  state:'Michigan',
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnbpt.metrorock.com%2F&psig=AOvVaw2yqf2Pi94bbBlwE0Wlmpvb&ust=1665420755828000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNDwlPbN0_oCFQAAAAAdAAAAABAE'
},
{
  organizerId: 1,
  name: 'The international friends',
  about:"THE PURPOSE OF THE GROUP.LEARNING it keeps the brain active; learning boosts the connections within your brain, and your brain can then apply that learning to other areas or problems. So, the more you learn, the better you get at learning! The purpose of learning is learning being prepared for their future and reaching their fullest potential as lifelong learners",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alamy.com%2Fmeeting-international-friends-students-from-different-countries-together-greet-each-other-in-their-native-language-worldwide-company-employees-at-image424756838.html&psig=AOvVaw0QJiaRaDEG-1NFvdirTBTC&ust=1665421149236000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIjh4bHP0_oCFQAAAAAdAAAAABAE'
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
