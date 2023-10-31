import {execSync} from 'child_process';

const migrationsDB = 'db-migrate up';

const runMigrations = () => {
    execSync(migrationsDB);
    console.log('migration done');
}

export default runMigrations;