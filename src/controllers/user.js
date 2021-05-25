"use strict";

module.exports = {

    list : async (req, res) => {
        return broker.call(`user.list`, {
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