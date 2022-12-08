const User = require("./user");
const postList = require("./postList");
const comments = require("./comments");

User.hasMany(postList, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

postList.belongsTo(User, {
  foreignKey: "user_id",
});

postList.hasMany(comments, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

comments.belongsTo(postList, {
  foreignKey: "post_id",
});

comments.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  postList,
  comments,
};
