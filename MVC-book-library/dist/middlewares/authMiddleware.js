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
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../db/dbConnection");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.header('authorization');
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm=""');
        return res.status(401).json({ error: 'Authentication required.' });
    }
    const decodedCredentials = atob(authHeader.split('Basic ')[1]);
    const [login, password] = decodedCredentials.split(':');
    if (!login || !password) {
        res.setHeader('WWW-Authenticate', 'Basic realm=""');
        return res.status(401).json({ error: 'Authentication required.' });
    }
    try {
        dbConnection_1.db.query(`SELECT * FROM book_library.admin WHERE email='${login}'`, function (err, result, fields) {
            if (err) {
                throw err;
            }
            const adminUser = JSON.parse(JSON.stringify(result))[0];
            if (!adminUser || adminUser.password !== password) {
                res.setHeader('WWW-Authenticate', 'Basic realm=""');
                return res.status(401).json({ error: 'Authentication required.' });
            }
            next();
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = authMiddleware;
