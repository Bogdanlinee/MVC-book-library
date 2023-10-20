import {db} from '../db/dbConnection';
import {Request, Response, NextFunction} from 'express'

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization');

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm=""');
        return res.status(401).json({error: 'Authentication required.'});
    }

    const decodedCredentials = atob(authHeader.split('Basic ')[1]);
    const [login, password] = decodedCredentials.split(':');

    if (!login || !password) {
        res.setHeader('WWW-Authenticate', 'Basic realm=""');
        return res.status(401).json({error: 'Authentication required.'});
    }

    try {
        db.query(`SELECT * FROM book_library.admin WHERE email='${login}'`, function (err, result, fields) {
            if (err) {
                throw err;
            }

            const adminUser = JSON.parse(JSON.stringify(result))[0];

            if (!adminUser || adminUser.password !== password) {
                res.setHeader('WWW-Authenticate', 'Basic realm=""');
                return res.status(401).json({error: 'Authentication required.'});
            }

            next();
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default auth;