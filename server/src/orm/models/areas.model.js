const { Sequelize, Model, DataTypes } = require('sequelize');

// Create a Sequelize instance and connect to your database
const sequelize = new Sequelize('veconomy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

// Define the Areas model
class Area extends Model {}

Area.init(
  {
    Name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Area',
    tableName: 'Areas', // Set the table name if it's different from the model name
  }
);

module.exports = Area;
