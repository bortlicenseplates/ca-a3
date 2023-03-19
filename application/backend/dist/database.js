"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require('knex');
const { database } = require('./config');
exports.default = knex({
    client: 'mysql2',
    connection: database,
});
