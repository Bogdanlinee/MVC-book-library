"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const migrationsDB = 'db-migrate up';
const runMigrations = () => {
    (0, child_process_1.execSync)(migrationsDB);
    console.log('migration done');
};
exports.default = runMigrations;
