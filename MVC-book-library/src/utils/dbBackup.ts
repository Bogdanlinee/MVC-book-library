export const dbBackup = (credentials: string) => {
    const {host, user, password, database} = JSON.parse(credentials);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const backupPath = 'dbBackup';
    const backupFileName = `${database}_${timestamp}.sql`;
    const command = `mysqldump -h ${host} -u ${user} -p${password} ${database}> ${backupPath}/${backupFileName}`;
    return command;
}