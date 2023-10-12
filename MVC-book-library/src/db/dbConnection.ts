import mysql, {Connection} from 'mysql';

let db: Connection;

export default (credentials: string) => {
    db = mysql.createConnection(JSON.parse(credentials));
    db.connect();
}