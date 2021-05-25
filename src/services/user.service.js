"use strict";

module.exports = {
    name: "user",

    actions: {
        test: {
            async handler(ctx) {
                const data =  ctx.params;
                return new Promise( async (resolve) => {
                    resolve({
                        status  : true,
                        data    : {
                            message     : await this.helloworld(),
                            senddate    : new Date()
                        }
                    });
                });
            }
        },
        hello: {
            params: {
                name: { type: "string", optional: true},
                createby: { type: "string", optional: true}
            },
            async handler(ctx) {
                const data =  ctx.params;
                return new Promise( resolve => {
                    resolve({
                        status  : true,
                        data    : {
                            ... data,
                            senddate: new Date()
                        }
                    });
                });
            }
        },
        list: {
            async handler(ctx) {
                const data =  ctx.params;
                return new Promise((resolve, reject) => {
                    this.findAllUser()
                    .then(result => {
                        resolve({
                            status: true,
                            data: result
                        });
                    })
                    .catch(err => {
                        reject(err);
                    });
                });
            }
        },
    },

    methods: {
        helloworld: () => {
            return new Promise(resolve => {
                resolve("Hello World!");
            });
        },
        findAllUser: () => {
            return new Promise((resolve, reject) => {
                db.user.findAll({
                    where: {
                        statusid: 1
                    },
                    raw: true
                }).then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    },

    async afterConnected() {}
};
