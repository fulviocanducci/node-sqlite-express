const Sequelize = require('sequelize');
const { sequelize } = require('../configurations/index');

class Todo extends Sequelize.Model {}
Todo.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                max: 100
            }
        },
        done: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                notNull: true
            }
        }
    },
    {
        modelName: 'todos',
        timestamps: false,
        freezeTableName: false,
        underscored: false,
        sequelize
    }
)

module.exports = Todo;