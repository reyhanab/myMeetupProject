'use strict';
let options = {validate :true, tablename:"groups"};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const {Group} = require('../models')
const fields = [{
  // 1
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
  // 2
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
  // 3
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
  // 4
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
  // 5
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
  // 6
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
  // 7
  organizerId: 1,
  name: 'Metro Detroit Rock Climbing!',
  about:"Climbing works best with a partner! Whether you're new to climbing or been around a bit let's do some climbing. We would love to meet up with you to climb.We hold events at 2 indoor locations: Planet Rock in Madison Heights and DYNO Detroit in Eastern Market.Both locations offer gear rental and day passes, punch passes or membership pricing to climb the day of our event.",
  type:'In person',
  private:false,
  city:'Saint Clair Shores',
  state:'Michigan',
  previewImage: 'https://images.squarespace-cdn.com/content/v1/60ccc2e5d0ca337c05d2aec2/2dc167ff-4fb7-4634-8fcd-db4262e7ccde/laura_leading1.jpeg'
},
{
  // 8
  organizerId: 1,
  name: 'biking Group, beginners welcome',
  about:"Beginners are welcome, but you need to be able to keep up with the group. I'm hoping to meet people that are into taking care of their health. Biking is a hobby for me and I want to share that with others. I also like to explore new places and see the city a different way.",
  type:'In person',
  private:false,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://imageio.forbes.com/specials-images/imageserve/5f0c6b7524c99300079a24ee/Mountain-Bike-sales-Pivot/960x0.jpg?format=jpg&width=960'
},
{
  // 9
  organizerId: 1,
  name: 'Hudson Valley Hikers',
  about:"Hudson Valley Hikers Events are by RSVP only on events posted to the calendar. Any other activity with members that is organized offline, in Meetup Discussions, or private messages; is not sanctioned by Hudson Valley Hikers and participation is at your own risk. Please contact Meetup directly if you have any questions or concerns.",
  type:'In person',
  private:false,
  city:'Hudson Valley',
  state:'NY',
  previewImage: 'https://hips.hearstapps.com/hmg-prod/images/woman-hiking-at-red-rock-canyon-during-sunset-with-royalty-free-image-1601478369.jpg'
},
{
  // 10
  organizerId: 1,
  name: 'Detroit Adventure Meetup Group',
  about:"Welcome Travel Lovers! I created this group to invite likeminded people to visit as much countries as possible for affordable price, create unforgettable experience, meet new people, and make new friends.",
  type:'In person',
  private:false,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.myglobalviewpoint.com/wp-content/uploads/2022/05/Best-Adventure-Quotes-Featured-Image.jpg'
},
{
  // 11
  organizerId: 1,
  name: 'MLK Ski Weekend',
  about:"2020 MLK Ski Weekend at Blue Mountain Ski Resort in Canada",
  type:'In person',
  private:false,
  city:'Detroit',
  state:'Michigan',
  previewImage: 'https://www.explorenicecotedazur.com/content/uploads/2021/09/SKI7.jpg'
},
{
  // 12
  organizerId: 1,
  name: 'Women In The Woods',
  about:"This is a no-pressure, come-as-you-are group for women who love the outdoors. Let's explore together and enjoy the mental and physical benefits of life outside!",
  type:'In person',
  private:false,
  city:'Livonia',
  state:'Michigan',
  previewImage: 'https://media.istockphoto.com/id/1136751074/photo/happy-hiker-caucasian-woman-smile-and-enjoy-the-nature-walking-in-a-forest-with-high-trees.jpg?b=1&s=170667a&w=0&k=20&c=wlK-RxngbvlFt4dp3SoACQ05nBctO176JhQc_yduyDA='
},
{
  // 13
  organizerId: 1,
  name: 'Solar Outdoors',
  about:"Solar Outdoors is a Southeast Michigan based club with more than 400 members. Founded in 1975, Solar Outdoors remains dedicated to helping its members enjoy nature and outdoor activities.",
  type:'In person',
  private:false,
  city:'Livonia',
  state:'Michigan',
  previewImage: 'https://i.natgeofe.com/n/8f633a47-1da9-4873-b851-0ed1bdd93e9a/hiking-survival-day-hike-alone_4x3.jpg'
},
{
  // 14
  organizerId: 1,
  name: 'Solo Travelers International',
  about:"We are an adventurous group of solo travelers that desire the excitement, savings, safety and camaraderie of traveling with a group. Our Meetups bring singles and those without a travel partner together to share valuable travel tips and interesting travel destinations. Please join us at our next event or adventurous destination!",
  type:'In person',
  private:false,
  city:'Troy',
  state:'Michigan',
  previewImage: 'https://mlhmvq6amqed.i.optimole.com/w:1152/h:768/q:mauto/f:avif/https://ideapod.com/wp-content/uploads/2021/10/pexels-alexandr-podvalny-2680937-1.jpg'
},
{
  // 15
  organizerId: 1,
  name: 'Farmington Kayaking Meetup',
  about:"I see a tremendous need for people getting together and going kayaking with others. Many people have their own kayaks now but they're looking for other people to go with. Would love to host events that get people together to enjoy this wonderful sport and the great outdoors.",
  type:'In person',
  private:true,
  city:'Farmington',
  state:'Michigan',
  previewImage: 'https://aceraft.com/wp-content/uploads/2019/05/touring-kayaks-summersville-lake-ace-adventure-resort-3.jpg'
},
{
  // 16
  organizerId: 1,
  name: 'Kayak Owners Recreation Group',
  about:"This is a group for people who have their own kayaks and would like to kayak a variety of locations. This allows us to go to lots of great places where rentals are not available.",
  type:'In person',
  private:true,
  city:'Northville',
  state:'Michigan',
  previewImage: 'https://edenvaleinn.com/wp-content/uploads/2019/04/eden-vale-woman-kayaking.jpeg'
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
