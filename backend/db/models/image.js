'use strict';
const {Model} = require('sequelize');
const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    getImagable(options) {
      if (!this.imagableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imagableType)}`;
      return this[mixinMethodName](options);
    }

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
  
  Image.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.imagableType === "group" && instance.group !== undefined) {
        instance.imagable = instance.group;
      } else if (instance.imagableType === "event" && instance.event !== undefined) {
        instance.imagable = instance.event;
      }
      delete instance.group;
      delete instance.dataValues.group;
      delete instance.event;
      delete instance.dataValues.event;
    }
  });
  return Image;
};

