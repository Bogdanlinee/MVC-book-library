"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbBackup = void 0;
const dbBackup = (credentials) => {
    const { host, user, password, database } = JSON.parse(credentials);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const backupPath = 'dbBackup';
    const backupFileName = `${database}_${timestamp}.sql`;
    const command = `mysqldump -h ${host} -u ${user} -p${password} ${database}> ${backupPath}/${backupFileName}`;
    return command;
};
exports.dbBackup = dbBackup;
