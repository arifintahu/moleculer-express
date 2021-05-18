"use strict";

const middlewares = require("../middlewares");

module.exports = (router) => {

    router.get(`/`, `general`, [ ], (req, res) => {
        controller.main.test(req, res);
    });
    router.post(`/hello`, `general`, [ ], (req, res) => {
        controller.main.hello(req, res);
    });

    return router;
};