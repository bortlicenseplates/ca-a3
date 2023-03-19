"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.database = void 0;
const fs_1 = __importDefault(require("fs"));
const readFileSync = (filename) => fs_1.default.readFileSync(filename).toString("utf8");
// Constants
exports.database = {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
        ? readFileSync(process.env.DATABASE_PASSWORD)
        : null
};
exports.port = process.env.PORT || 8080;
