import cron from 'node-cron';
import {dbBackup} from './dbBackup';
import {exec} from 'child_process';

const task = function (credentials: string) {
    return cron.schedule('*/10 * * * * *', () => {
        const command = dbBackup(credentials);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                throw Error('Something wrong with cron: ' + error);
            } else {
                console.log('Database backup created successfully');
            }
        });
    });
}
export const cornStart = (credentials: string) => {
    task(credentials).start();
}

