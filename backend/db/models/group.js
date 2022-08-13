'use strict';
const {Model,} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
          constraints:false,
          scope: {
            imageableType: 'Group'
          }
        }
      ),
      Group.hasMany(
        models.Venue,
        {foreignKey:'groupId',onDelete:'CASCADE', hooks:true}
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
      validate:{
        isUrl:true
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};