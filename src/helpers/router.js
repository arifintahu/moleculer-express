"use strict";

const
    fs          = require("fs"),
    express     = require("express"),
    bodyParser  = require("body-parser"),
    busBoy      = require("express-busboy"),
    useragent   = require("express-useragent"),
    namedRouter = require("named-routes");

const basedir   = process.env.PWD;

const createRoute = (bussboy = true) => {

    const
        router    = express.Router(),
        nmRouter = new namedRouter();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(useragent.express());

    nmRouter.extendExpress(router);

    if(!bussboy) {
        busBoy.extend(router, {
            upload : true,
            path   : `${basedir}/protected/`,
            mimeTypeLimit : [
                /* .jpg & .jpeg */ `image/jpeg`,
                /* .png         */ `image/png`,
                /* .xls         */ `application/vnd.ms-excel`,
                /* .ppt         */ `application/vnd.ms-powerpoint`,
                /* .doc         */ `application/msword`,
                /* .csv         */ `text/csv`,
                /* .xlsx        */ `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
                /* .pptx        */ `application/vnd.openxmlformats-officedocument.presentationml.presentation`,
                /* .docx        */ `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
                /* .pdf         */ `application/pdf`,
                /* .zip         */ `application/zip`,
                /* .rar         */ `application/x-rar-compressed`,
                /* .7z          */ `application/x-7z-compressed`,
                /* .txt         */ `text/plain`
            ]
        });
    }

    return router;
}

module.exports = () => {

    const router = createRoute(false);

    fs.readdirSync(`${basedir}/src/routers`).forEach((file, index) => {
        try {
            const api      = file.replace(/.js|.ts/g, "").toLowerCase();
            const route    = require(`${basedir}/src/routers/${file}`);
            const template = createRoute();
            
            if (file === "main.js") {
                router.use("/", route(template));
            } else {
                router.use(`/${api}`, route(template));
            }
        }
        catch(err) {
            console.log(err);
            console.warn(`Router Warning: Cannot find module '/src/routers/${file}'.`);
        }
    });

    return router;
};