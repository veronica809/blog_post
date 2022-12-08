const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "blogger",
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (userData) => {
        const passwordHash = await bcrypt.hash(userData.password, 10);
        userData.password = passwordHash;
        return userData;
      },
      beforeUpdate: async (userData) => {
        const passwordHash = await bcrypt.hash(userData.password, 10);
        userData.password = passwordHash;
        return userData;
      },
    },
    sequelize,
    modelName: "User",
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
