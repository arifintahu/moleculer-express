"use strict";

const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define("user", {
        user_uid      : {
            type       : Sequelize.UUIDV4,
            primaryKey : true,
            defaultValue: Sequelize.UUIDv4
        },
        name      : {
            type       : Sequelize.STRING,
            allowNull : false
        },
        customer_id      : {
            type       : Sequelize.STRING
        },
        username      : {
            type       : Sequelize.STRING
        },
        statusid  : {
            type      : Sequelize.INTEGER
        },
        createdate    : {
            type      : Sequelize.DATE
        },
        createby      : {
            type      : Sequelize.STRING
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false,
    });

};