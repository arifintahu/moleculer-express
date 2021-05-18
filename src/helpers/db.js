"use strict";

const { Sequelize, Op } = require("sequelize");
const fs                = require("fs");
const basedir           = process.env.PWD;

module.exports = function() {

    const loaders = {
        methods: {
            database() {
                return new Promise((resolve, reject) => {
                    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
                        host    : process.env.DB_HOST,
                        port    : process.env.DB_PORT,
                        dialect : process.env.DB_ENGINE,
                        schema  : process.env.DB_SCHEMA,
                        logging : process.env.DB_LOGGING ? console.log : false
                    });

                    sequelize.authenticate()
                        .then(() => {
                            this.logger.info("Database connection has been established successfully.");
                            const path  = `${basedir}/src/schemas`;
                            const db    = {};

                            fs.readdirSync(path).map((file, idx) => {

                                if(file.replace(/.js|.ts/g, "") === "relation") {
                                    return;
                                }

                                db[file.replace(/.js|.ts/g, "")] = require(`${path}/${file}`)(sequelize);
                            });

                            global.sequelize = sequelize;

                            resolve(db);
                        }).catch((error) => {
                            this.logger.error("Unable to connect to the database:", error);
                            reject(error);
                        });
                });
            }, 
        },

        async started() {
            if (process.env.DB_LOAD == true) {
                const db = await this.database();
            
                global.db = require(`${basedir}/src/schemas/relation`)(db);
                global.Op = Op;
            } else {
                this.logger.info("Database configuration is false.");
            }
        }
    };

    return loaders;
};