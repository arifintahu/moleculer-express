"use strict";

module.exports = {

    test : async (req, res) => {
        return broker.call(`user.test`, {
            ... req.body,
            ... req.query,
            ... req.params
        }).then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(401);
            }
        }).catch(handleErr(res));
    },

    hello : async (req, res) => {
        return broker.call(`user.hello`, {
            ... req.body,
            ... req.query,
            ... req.params
        }).then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(401);
            }
        }).catch(handleErr(res));
    }
    
};