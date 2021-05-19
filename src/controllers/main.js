"use strict";

module.exports = {

    test : async (req, res) => {
        return broker.call(`user.test`, {
            ... req.body,
            ... req.query,
            ... req.params
        }).then(result => {
            if (result.status) {
                res.json(result.data);
            } else {
                res.status(401).send(result.data);
            }
        }).catch(handleErr(res));
    },

    hello : async (req, res) => {
        return broker.call(`user.hello`, {
            ... req.body,
            ... req.query,
            ... req.params
        }).then(result => {
            if (result.status) {
                res.json(result.data);
            } else {
                res.status(401).send(result.data);
            }
        }).catch(handleErr(res));
    }
    
};