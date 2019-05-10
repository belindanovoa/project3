module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Comment.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
