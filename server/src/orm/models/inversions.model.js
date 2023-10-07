const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('veconomy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

class Inversion extends Model {}

Inversion.init(
  {
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    ID_Project: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Projects', // This should be the name of the referenced table
        key: 'ID'
      }
    },
    Quantity_Invested: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false
    },
    ID_User: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users', // This should be the name of the referenced table
        key: 'ID'
      }
    }
  },
  {
    sequelize,
    modelName: "Inversion"
  }
);

module.exports = Inversion;
