const fs      	= require("fs");

class Loaders {
	constructor() {
		this.basedir = process.env.PWD;
	}

	started() {
		return new Promise( async (resolve) => {
			global.controller = await this.controllers();
			resolve("Controllers are loaded");
		});
	}


    controllers() {
        return new Promise((resolve) => {
            const controller = {};

            fs.readdirSync(`${this.basedir}/src/controllers`).forEach((file) => {
                const
                    name = file.replace(/.js|.ts/g, "").toLowerCase(),
                    src = require(`${this.basedir}/src/controllers/${file}`);
    
                controller[name] = src;
            });
            resolve(controller);
        });
    }

}

module.exports = Loaders;