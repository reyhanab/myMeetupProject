'use strict';
const {Model, Sequelize} = require('sequelize');
const {validator} = require ('validator')

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(
        models.Group,
        {foreignKey:'groupId'}
      )
      Event.belongsTo(
        models.Venue,
        {foreignKey:'venueId'}
      ),
      // Event.belongsToMany(
      //   models.User,
      //   {through:models.Attendee}
      // ),
      Event.hasMany(
        models.Attendee,
        {foreignKey:'eventId',onDelete:'CASCADE', hooks:true}
      ),
      Event.hasMany(
        models.Image,
        { foreignKey:'imagableId',
          constraints:false,
          scope: {
            imagableType: 'event'
          }
        }
      )
    }
  }
  Event.init({
    groupId: {
      type:DataTypes.INTEGER,
      onDelete:'CASCADE',
      allowNull:false
    },
    venueId: {
      type:DataTypes.INTEGER,
      // onDelete:'CASCADE',
      allowNull:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,256]
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isIn:[['Online','In person']]
      }
    },
    capacity: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    startDate: {
      type:DataTypes.DATE,
      validate:{
        // isDate:true,
        // isAfter: Date.now()
        isAfter: new Date().toDateString()
        // dateValidator(value){
        //   if (new Date(value).isBefore(new Date())){
        //     throw new Error("invalid start date");
        //   }
        //  }
      }
    },
    endDate:{
      type:DataTypes.DATE,
      validate:{
      //   // isAfter: new Date().toDateString()
        dateValidator(value){
          if (new Date(value).toISOString() < new Date(this.startDate).toISOString()){
            throw new Error("invalid end date");
          }
        }
      }
      },
    previewImage:{
      type:DataTypes.TEXT,
      allowNull:true
    }

  }, {
    sequelize,
    modelName: 'Event',
    defaultScope:{
      attributes:{
        exclude:['createdAt', 'updatedAt']
      }
    },
    scopes:{
      createEvent:{
        attributes:{
          exclude:['createdAt', 'updatedAt']
        }
      }
    }
  });
  return Event;
};