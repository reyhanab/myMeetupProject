'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(
        models.Group,
        {foreignKey:'imagableId',
        constraints:false}
      ),
      Image.belongsTo(
        models.Event,
        {foreignKey:'imagableId',
        constraints:false}
      ),
      Image.belongsTo(
        models.User,
        {foreignKey:'userId'}
      )
    }
  }
  Image.init({
    userId:{
      type:DataTypes.INTEGER,
      onDelete:'CASCADE'
    },
    imagableId: DataTypes.INTEGER,
    imagableType: DataTypes.STRING,
    url:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ["userId",'imagableType', "createdAt", "updatedAt"]
      }
    }
  });
  return Image;
};