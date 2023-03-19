"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const config_1 = require("./config");
const server = server_1.default.listen(config_1.port, function () {
    console.log("Webserver is ready");
});
// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
    console.info("Got SIGINT (aka ctrl-c in docker). Graceful shutdown ", new Date().toISOString());
    shutdown();
});
// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
    console.info("Got SIGTERM (docker container stop). Graceful shutdown ", new Date().toISOString());
    shutdown();
});
// shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
}
//
// need above in docker container to properly exit
//
