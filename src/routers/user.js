"use strict";

const middlewares = require("../middlewares");

module.exports = (router) => {

    router.get(`/list`, `general`, [ ], (req, res) => {
        controller.user.list(req, res);
    });

    return router;
};