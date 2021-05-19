"use strict";

module.exports = {

    list : async (req, res) => {
        return broker.call(`user.list`, {
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