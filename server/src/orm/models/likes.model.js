const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('veconomy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

class Like extends Model {}

Like.init(
  {
    ID_User: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Set ID_User as part of the primary key
      references: {
        model: 'Users', // This should match the name of the Users table in your database
        key: 'ID'
      },
      onDelete: 'CASCADE'
    },
    ID_Project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Set ID_Project as part of the primary key
      references: {
        model: 'Projects', // This should match the name of the Projects table in your database
        key: 'ID'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "Likes" // Set the table name explicitly
  }
);

module.exports = Like;