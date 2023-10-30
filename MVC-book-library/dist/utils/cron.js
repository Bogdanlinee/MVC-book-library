"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cornStart = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dbBackup_1 = require("./dbBackup");
const child_process_1 = require("child_process");
const bookQueriesUtil_1 = require("./bookQueriesUtil");
const task = function (credentials) {
    return node_cron_1.default.schedule('5 10 * * *', () => __awaiter(this, void 0, void 0, function* () {
        const commandBackupDB = (0, dbBackup_1.dbBackup)(credentials);
        (0, child_process_1.exec)(commandBackupDB, (error, stdout, stderr) => {
            if (error) {
                throw Error('Something wrong with cron: ' + error);
            }
            else {
                console.log('Database backup created successfully');
            }
        });
        yield (0, bookQueriesUtil_1.deleteBookFromDB)();
    }));
};
const cornStart = (credentials) => {
    task(credentials).start();
};
exports.cornStart = cornStart;
