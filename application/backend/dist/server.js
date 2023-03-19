"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("common"));
app.get("/", function (req, res, next) {
    database_1.default.raw('select VERSION() version')
        .then(([rows, columns]) => rows[0])
        .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
        .catch(next);
});
app.get("/healthz", function (req, res) {
    // do app logic here to determine if app is truly healthy
    // you should return 200 if healthy, and anything else will fail
    // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
    res.json({ message: "I am happy and healthy" });
});
exports.default = app;
