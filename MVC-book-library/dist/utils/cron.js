"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cornStart = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dbBackup_1 = require("./dbBackup");
const child_process_1 = require("child_process");
const task = function (credentials) {
    return node_cron_1.default.schedule('*/10 * * * * *', () => {
        const command = (0, dbBackup_1.dbBackup)(credentials);
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                throw Error('Something wrong with cron: ' + error);
            }
            else {
                console.log('Database backup created successfully');
            }
        });
    });
};
const cornStart = (credentials) => {
    task(credentials).start();
};
exports.cornStart = cornStart;
