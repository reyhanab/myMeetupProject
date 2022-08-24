'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendee.belongsTo(
        models.Event,
        {foreignKey:'eventId'}
      ),
      Attendee.belongsTo(
        models.User,
        {foreignKey:'userId'}
      )
    }
  }
  Attendee.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:'CASCADE'
    },
    eventId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:'CASCADE'
    },
    status:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isIn:[['member','pending', 'waitlist']]
      }
    }
  }, {
    sequelize,
    modelName: 'Attendee',
    // defaultScope:{
    //   attributes:{
    //     exclude:['createdAt', 'updatedAt', 'EventId', 'UserId']
    //   }
    // },
    // scopes:{
    //   updateAttendee:{
    //     attributes:{
    //       exclude:['createdAt', 'updatedAt', 'EventId', 'UserId']
    //     }
    //   }
    // }
  });
  return Attendee;
};