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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = require("./db/dbConnection");
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const singleBookRoutes_1 = __importDefault(require("./routes/singleBookRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// serve static
app.use('/', express_1.default.static('public/books-page'));
app.use('/book/:id', express_1.default.static('public/book-page'));
app.use('/api/v1/books', booksRoutes_1.default);
app.use('/api/v1/book', singleBookRoutes_1.default);
// app.get('/protected', (req, res) => {
//     res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
//     res.status(401).send('Authentication required.');
// });
app.post('/api/v1/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        dbConnection_1.db.query(`SELECT * FROM book_library.admin WHERE email='${email}'`, function (err, result, fields) {
            if (err) {
                throw err;
            }
            const adminUser = JSON.parse(JSON.stringify(result))[0];
            if (!adminUser || adminUser.password !== password.trim()) {
                return res.status(400).json({ error: 'Wrong credentials' });
            }
            const authHeader = 'Basic ' + Buffer.from(email + ':' + password).toString('base64');
            res.setHeader('WWW-Authenticate', authHeader);
            res.status(200).json({ user: adminUser });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MYSQL_CONNECTION) {
        throw new Error('No db credentials');
    }
    (0, dbConnection_1.connectDB)(process.env.MYSQL_CONNECTION);
    try {
    }
    catch (err) {
        console.log(err);
    }
    console.log('server is running');
}));
