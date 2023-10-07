const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('veconomy', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

class Rol extends Model { }

Rol.init(
  {
    nameRole: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    Lvl: {
      type: DataTypes.INTEGER,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Rol",
    timestamps: false, // Set this to true if you want to include timestamps
    tableName: 'Rols' // This is the table name in the database
  }
);

module.exports = Rol;
