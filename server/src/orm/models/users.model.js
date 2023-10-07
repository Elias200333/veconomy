const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize('veconomy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
}
)

class User extends Model { }

User.init(
    {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Rol_User: {
            type: DataTypes.STRING,
            allowNull: false
        },
        KYC_Verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "User"
    }
)

module.exports = User