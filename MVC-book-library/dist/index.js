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
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static('public/book-page'));
app.use(express_1.default.static('public/books-page'));
// /api/v1/?offset=N
// /api/v1/books/{book_id}
// /admin/api/v1/.
app.get('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ lol: 'lol' });
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    // migration to create new db
    // const filePath = path.join(__dirname, '../db/createDB.sql');
    // const fileData = await fs.readFile(filePath, {encoding: 'utf-8'});
    // console.log(fileData);
    if (!process.env.MYSQL_CONNECTION) {
        throw new Error('No db credentials');
    }
    (0, dbConnection_1.default)(process.env.MYSQL_CONNECTION);
    try {
    }
    catch (err) {
        console.log(err);
    }
    console.log('server is running');
}));
