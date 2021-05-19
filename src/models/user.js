"use strict";

const Sequelize = require("sequelize");

module.exports = (db) => {

    return db.define("user", {
        user_uid            : {
            type            : Sequelize.UUIDV4,
            primaryKey      : true,
            defaultValue    : Sequelize.UUIDv4
        },
        email               : {
            type            : Sequelize.STRING,
            allowNull       : false
        },
        password            : {
            type            : Sequelize.STRING,
            allowNull       : false
        },
        fullname            : {
            type            : Sequelize.STRING
        },
        validdate           : {
            type            : Sequelize.DATE
        },
        statusid            : {
            type            : Sequelize.INTEGER
        },
        createdate          : {
            type            : Sequelize.DATE
        },
        createby            : {
            type            : Sequelize.STRING
        }
    }, {
        freezeTableName     : true,
        createdAt           : false,
        updatedAt           : false
    });

};