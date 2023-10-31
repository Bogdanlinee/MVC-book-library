import cron from 'node-cron';
import {dbBackup} from './dbBackup';
import {exec} from 'child_process';
import {deleteBookFromDB} from './bookQueriesUtil';

const task = function (credentials: string) {
    return cron.schedule('40 15 * * *', () => {
        const commandBackupDB = dbBackup(credentials);

        exec(commandBackupDB, async (error, stdout, stderr) => {
            if (error) {
                throw Error('Something wrong with cron: ' + error);
            } else {
                console.log('Database backup created successfully');
                await deleteBookFromDB();
            }
        });
    });
}
export const cornStart = (credentials: string) => {
    task(credentials).start();
}