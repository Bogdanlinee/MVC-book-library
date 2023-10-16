import mysql, {Connection} from 'mysql';

let db: Connection;
const connectDB = (credentials: string) => {
    db = mysql.createConnection(JSON.parse(credentials));
    db.connect();
}

export {
    db,
    connectDB,
}