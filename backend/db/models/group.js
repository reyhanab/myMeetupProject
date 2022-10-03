'use strict';
const {Model,} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {


    static associate(models) {
      Group.hasMany(
        models.Membership,
        {foreignKey:'groupId',onDelete:'CASCADE', hooks:true}
      ),
      Group.hasMany(
        models.Event,
        {foreignKey:'groupId',onDelete:'CASCADE', hooks:true}
      ),
      Group.hasMany(
        models.Image,
        {
          foreignKey:'imagableId',
          as:'Images',
          constraints:false,
          scope: {
            imagableType: 'group'
          }
        }
      ),
      Group.hasMany(
        models.Venue,
        {foreignKey:'groupId',onDelete:'CASCADE', hooks:true, as:"Venues"}
      ),
      Group.belongsTo(
        models.User,
        {foreignKey:'organizerId', as:'Organizer'}
      )
    }
  }
  Group.init({
    organizerId: {
      type:DataTypes.INTEGER,
      onDelete:'CASCADE',
      allowNull:false
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[2,60]
      }
    },
    about:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[50,1024]
      }
    },
    type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isIn:[['Online', 'In person']]
      }
    },
    private: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    previewImage:{
      type:DataTypes.STRING,
      allowNull:true,
    }
  }, {
    sequelize,
    modelName: 'Group',
    scopes:{
      editResponse:{
        attributes:{
          exclude:['previewImage']
        }
      }
    }
  });
  return Group;
};