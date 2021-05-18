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
        }
    },

    methods: {
        helloworld: () => {
            return new Promise(resolve => {
                resolve("Hello World!");
            });
        }
    },

    async afterConnected() {}
};
