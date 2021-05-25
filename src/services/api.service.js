"use strict";

const express   = require("express");
const path      = require("path");
const cors      = require("cors");
const db        = require("../helpers/db");
const router    = require("../helpers/router");

module.exports = {
    name: "api",
    mixins: [db()],
    settings: {
        port: process.env.PORT      || 3003,
        host: process.env.HOST      || null,
        api: process.env.API        || null,
        cors: process.env.CORS_URL  || "*"
    },
    methods: {

        initRoutes(app) {
            app.use(cors({
                origin: this.settings.cors,
                optionsSuccessStatus: 200
            }));
            app.use(`/${process.env.API}`, router());

            return app;
        },

        handleErr(res) {
            return err => {
                res.status(err.code || 500).send(err.message);
            };
        }

    },
    async created() {
        this.app            = this.initRoutes(express());
        
        global.broker       = this.broker;
        global.handleErr    = this.handleErr;
        
    },
    started() {
        this.app.listen(Number(this.settings.port), this.settings.host, err => {
            if (err)
                return this.broker.fatal(err);

            this.logger.info(`Server started on port ${this.settings.port}`);
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
