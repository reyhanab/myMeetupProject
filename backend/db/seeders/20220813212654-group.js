'use strict';
let options = {validate :true, tablename:"groups"};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const {Group} = require('../models')
const fields = [{
  organizerId: 1,
  name: 'Metro Detroit Outdoors',
  about:"Do you like being outdoors and active? Give us a try. We are outside four seasons of the year with lots of hiking, some canoeing, camping and x-c skiing.  ",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'Michigan',
  previewImage:'https://www.muscleandfitness.com/wp-content/uploads/2017/08/Female-kayaking-in-cavernous-river.jpg?quality=86&strip=all'
},
{
  organizerId: 2,
  name: 'The Weekenders',
  about:"This group is for young people (20's & 30's) looking for a little somethin' on the weekends other than the usual grind. This is also a shout out to all of you who are new in town and are looking to meet people! ",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'Michigan',
  previewImage: 'https://www.aaastateofplay.com/media/page-images/free-guides/Parks-Over-Pinterest--Getting-Teens-to-Spend-More-Time-Outdoors.jpg'
},
{
  organizerId: 3,
  name: 'Ladies Night 25-45',
  about:"This group is for women ages 25 to 45 who are interested in making new friendships.",
  type:'In person',
  private:true,
  city:'Utica',
  state:'Michigan',
  previewImage:"https://www.milwaukeemag.com/wp-content/uploads/2018/01/GettyImages-499366540.jpg"
},
{
  organizerId: 1,
  name: 'Detroit Travel Community - Tripsider Adventure Tours',
  about:"Are you interested in exploring the world, but uncertain about where to start or who to go with? Find travel mates in our community!We are pleased to welcome you to The Detroit Travel Community, powered by Tripsider! At our community, we use a laid-back approach to small group travel that feels more like exploring the world with old friends than anything else. Our less-restricting itineraries mean spontaneous, fun-filled opportunities to capture the best of what every spot along the way has to offer.",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.traveloffpath.com/wp-content/uploads/2022/05/Travel-Demand-is-Back-to-Pre-Pandemic-Levels-and-What-it-Means-To-You-This-Summer.jpg'
},
{
  organizerId: 1,
  name: 'Outdoor Afro',
  about:"Outdoor Afro is a community that reconnects and centers the Black experience with natural spaces and one another through recreational activities such as camping, hiking, biking, birding, fishing, gardening, skiing — and more! We use social media to create interest communities, events, and to help shift the visual representation of who gets outdoors. Here is where you can start (or expand) connecting with local Black people who share your outdoor interests and aspirations!",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://nfg-sofun.s3.amazonaws.com/uploads/ui_configuration/main_logo/339/welcome_logo_logoAO.png'
},
{
  organizerId: 1,
  name: 'Road Cycling SE Michigan',
  about:"This group is for road cyclists to meet together for both organized and spontaneous rides. It will primarily post League of Michigan Bicyclists events and events of affiliated bicycle clubs. All rides require you to wear a helmet approved for bicycle riding. The START time posted is the time the group LEAVES the parking lot. Please arrive early enough so that you are ON your bike and READY TO ROLL 5 minutes before the start of the ride. Please note that member clubs expect you to be able to MAINTAIN the posted pace of the ride. If you have a 30 pound hybrid and walk your bike up hills, don't show up for a 18-20 mph pace ride and expect everyone to slow down so you can keep up. You should carry all tools and parts needed to repair your own flats.",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://images.immediate.co.uk/production/volatile/sites/21/2019/11/Cannondale-CAAD13-Force-eTap-AXS-01-eea8773.jpg?quality=90&resize=620,413'
},
{
  organizerId: 1,
  name: 'Metro Detroit Rock Climbing!',
  about:"Climbing works best with a partner! Whether you're new to climbing or been around a bit let's do some climbing. We would love to meet up with you to climb.We hold events at 2 indoor locations: Planet Rock in Madison Heights and DYNO Detroit in Eastern Market.Both locations offer gear rental and day passes, punch passes or membership pricing to climb the day of our event.",
  type:'In person',
  private:true,
  city:'Saint Clair Shores',
  state:'Michigan',
  previewImage: 'https://images.squarespace-cdn.com/content/v1/60ccc2e5d0ca337c05d2aec2/2dc167ff-4fb7-4634-8fcd-db4262e7ccde/laura_leading1.jpeg'
},
{
  organizerId: 1,
  name: 'The international friends',
  about:"THE PURPOSE OF THE GROUP.LEARNING it keeps the brain active; learning boosts the connections within your brain, and your brain can then apply that learning to other areas or problems. So, the more you learn, the better you get at learning! The purpose of learning is learning being prepared for their future and reaching their fullest potential as lifelong learners",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://thumbs.dreamstime.com/b/young-friends-all-around-world-standing-posing-photo-happy-international-friendship-vector-cartoon-illustration-90481934.jpg'
}
]
module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate(fields)
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
