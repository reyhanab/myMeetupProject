'use strict';
const {Image} = require('../models')
const fields = [
  {
    userId:1,
    imagableId:1,
    imagableType:'Group',
    url: "https://www.google.com/search?sxsrf=ALiCzsYXQVWE49ZfmmDzIVABJaav1aU1TA:1660589040103&q=dog&tbm=isch&sa=X&ved=2ahUKEwinkOmewMn5AhWnlYkEHbZQCwMQ0pQJegQICxAB&biw=877&bih=904&dpr=1#imgrc=btQ8-aZ4x2YyMM"
  },
  {
    userId:2,
    imagableId:2,
    imagableType:'Event',
    url: "https://www.google.com/search?sxsrf=ALiCzsYXQVWE49ZfmmDzIVABJaav1aU1TA:1660589040103&q=dog&tbm=isch&sa=X&ved=2ahUKEwinkOmewMn5AhWnlYkEHbZQCwMQ0pQJegQICxAB&biw=877&bih=904&dpr=1#imgrc=btQ8-aZ4x2YyMM"
  },
  {
    userId:3,
    imagableId:3,
    imagableType:'Group',
    url: "https://www.google.com/search?sxsrf=ALiCzsYXQVWE49ZfmmDzIVABJaav1aU1TA:1660589040103&q=dog&tbm=isch&sa=X&ved=2ahUKEwinkOmewMn5AhWnlYkEHbZQCwMQ0pQJegQICxAB&biw=877&bih=904&dpr=1#imgrc=btQ8-aZ4x2YyMM"
  }

]
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let item of fields){
      const {userId,imagableId,imagableType,url} = item
      await Image.create({userId,imagableId,imagableType,url})
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Image')
  }
};
