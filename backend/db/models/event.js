'use strict';
const {
  Model, Sequelize
} = require('sequelize');
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
      Event.belongsToMany(
        models.User,
        {through:models.Attendee}
      ),
      Event.hasMany(
        models.Image,
        { foreignKey:'imagableId',
          constraints:false,
          scope: {
            imageableType: 'Event'
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
      onDelete:'CASCADE',
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,256]
      }
    },
    description: {
      type:DataTypes.STRING,
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
        isAfter: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    endDate:{
      type:DataTypes.DATE,
      validate:{
        isAfter:this.startDate
      }
    },
    previewImage:{
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};