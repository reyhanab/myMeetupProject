'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {

    static associate(models) {
      Venue.hasMany(
        models.Event,
        {foreignKey:'venueId',onDelete:'CASCADE', hooks:true }
      ),
      Venue.belongsTo(
        models.Group,
        {foreignKey:'groupId'}
      )
    }
  }
  Venue.init({
    groupId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete:'CASCADE'
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
     type: DataTypes.STRING,
     allowNull:false
    },
    lat: {
      type:DataTypes.DECIMAL,
      allowNull:false
    },
    lng:{
      type:DataTypes.DECIMAL,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};