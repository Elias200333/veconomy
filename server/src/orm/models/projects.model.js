const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('veconomy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

class Project extends Model {}

Project.init(
  {
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true // You can set it to allowNull: false if you want it to be required
    },
    Objective_Quantity: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    Multimedy: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    ID_User: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'ID'
      }
    },
    ID_Area: {
      type: DataTypes.STRING(255),
      allowNull: true, // You can set it to allowNull: false if you want it to be required
      references: {
        model: 'Areas',
        key: 'Name'
      }
    }
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "Projects" // Make sure it matches your table name in the database
  }
);

module.exports = Project;
