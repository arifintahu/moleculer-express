"use strict";

const express       = require("express");
const path          = require("path");
const db            = require("../helpers/db");
const router        = require("../helpers/router");

module.exports = {
    name: "api",
    mixins: [db()],
    settings: {
        port: process.env.PORT || process.env.APP_PORT,
        host: process.env.APP_HOST || "0.0.0.0"
    },
    methods: {

        initRoutes(app) {
            app.use(`/${process.env.APP_API}`, router());
        },

        handleErr(res) {
            return err => {
                res.status(err.code || 500).send(err.message);
            };
        }

    },
    async created() {
        this.app            = express();
        this.initRoutes(this.app);
        
        global.broker       = this.broker;
        global.handleErr    = this.handleErr;
        
    },
    started() {
        this.app.listen(Number(this.settings.port), this.settings.host, err => {
            if (err)
                return this.broker.fatal(err);

            this.logger.info(`Server started on ${this.settings.host}:${this.settings.port}`);
        });
    },
    stopped() {
        if (this.app.listening) {
            this.app.close(err => {
                if (err)
                    return this.logger.error("Server close error!", err);

                this.logger.info("Server stopped!");
            });
        }
    }
};
