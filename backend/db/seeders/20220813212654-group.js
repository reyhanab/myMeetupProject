'use strict';
const {Group} = require('../models')
const fields = [{
  organizerId: 1,
  name: 'Metro Detroit Outdoors',
  about:"Do you like being outdoors and active? Give us a try. We are outside four seasons of the year with lots of hiking, some canoeing, camping and x-c skiing. This Meetup is a project of the local Sierra Club Group--Southeast Michigan Group (SEMG), a part of the Michigan Chapter of National Sierra Club, one of the oldest environmental activist organizations in the US.  The project is designed to give metro-Detroiters outdoor experiences with the hope that they will be motivated to be more concerned about our natural environment and perhaps decide to join Sierra Club. ",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'MI',
  previewImage: "https://www.google.com/search?sxsrf=ALiCzsYXQVWE49ZfmmDzIVABJaav1aU1TA:1660589040103&q=dog&tbm=isch&sa=X&ved=2ahUKEwinkOmewMn5AhWnlYkEHbZQCwMQ0pQJegQICxAB&biw=877&bih=904&dpr=1#imgrc=btQ8-aZ4x2YyMM"
},
{
  organizerId: 2,
  name: 'The Weekenders',
  about:"This group is for young people (20's & 30's) looking for a little somethin' on the weekends other than the usual grind. This is also a shout out to all of you who are new in town and are looking to meet people! So! Let's get together once a week and enjoy the 'scene' here in the fabulous Metro Detroit area. Activities include outings to bars and restaurants, witty banter (if we're lucky), concerts, community events, and the occasional house party.",
  type:'In person',
  private:true,
  city:'Royal Oak',
  state:'MI',
  previewImage: "https://www.google.com/search?sxsrf=ALiCzsYXQVWE49ZfmmDzIVABJaav1aU1TA:1660589040103&q=dog&tbm=isch&sa=X&ved=2ahUKEwinkOmewMn5AhWnlYkEHbZQCwMQ0pQJegQICxAB&biw=877&bih=904&dpr=1#imgrc=btQ8-aZ4x2YyMM"
},
{
  organizerId: 3,
  name: 'Ladies Night 25-45',
  about:"This group is for women ages 25 to 45 who are interested in making new friendships. Do you ever feel like no one wants to go out?!? Then this is the right place for you! Let's start enjoying life again with others. Let's celebrate our accomplishments, get to know eachother, laugh, and have fun! Leave your worries behind because it's a LADIES night out! Meet ups will occur at least once a month. Everybody can be an event organizer. DM for info on event organizer.",
  type:'In person',
  private:true,
  city:'Utica',
  state:'MI'
},
{
  organizerId: 4,
  name: '20s & 30s New Friends',
  about:"We're just people who like to have fun and meet new faces. We do all kinds of things from sports to bar-hopping to arcades. It's laid back, has cool people, and encourages you to get off your",
  type:'Online',
  private:false,
  city:'Rochester',
  state:'MI'
},
{
  organizerId: 5,
  name: 'Trailblaze Challenge Hikes',
  about:"Welcome experienced hikers, and those who are interested in trying it out! We invite you to join us to learn more about hiking, experience Michigan trails with a group leader and learn a bit",
  type:'In person',
  private:true,
  city:'Detroit',
  state:'MI'
}]
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
