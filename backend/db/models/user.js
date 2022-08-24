'use strict';
const {Model,Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     toSafeObject() {
      const { id, email } = this;
      return { id, email };
    }
    validatePassword(cPassword) {
      return bcrypt.compareSync(cPassword, this.password.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ email, password }) {
      const user = await User.scope('loginUser').findOne({
        where: {
          email
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser', 'defaultScope').findByPk(user.id);
      }
    }

    static async signup({ firstName,lastName, email, password }) {
      let user;
      password = bcrypt.hashSync(password);

        user = await User.create({
          firstName,
          lastName,
          email,
          password
        });
      return await User.scope('currentUser', 'defaultScope').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(
        models.Group,
        {foreignKey:'organizerId',onDelete:'CASCADE', hooks:true}
      ),
      User.hasMany(
        models.Membership,
        {foreignKey:'memberId',onDelete:'CASCADE', hooks:true, }
      ),
      User.hasMany(
        models.Attendee,
        {foreignKey:'userId',onDelete:'CASCADE', hooks:true, }
      ),
      // User.belongsToMany(
      //   models.Event,
      //   {through:models.Attendee}
      // ),
      User.hasMany(
        models.Image,
        {foreignKey:'userId',onDelete:'CASCADE', hooks:true}
      )
    }
  }
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull:false,

    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false,

    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        len: [3, 256],
        isEmail:true
      }
    },
    password:{
      type:DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ["password"]
        }
      },
      loginUser: {
        attributes: {}
      },

    }
  });
  return User;
};