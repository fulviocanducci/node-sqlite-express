const Sequelize = require('sequelize');
const { sequelize } = require('../configurations/index');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        app_id: {
            type: Sequelize.STRING,
            allowNull: true
        },
        active: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                isInt: true
            }
        }
    },
    {
        modelName: 'users',
        timestamps: false,
        freezeTableName: false,
        underscored: false,
        sequelize
    }
)

module.exports = User;