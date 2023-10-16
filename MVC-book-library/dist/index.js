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
const dbConnection_1 = require("./db/dbConnection");
const morgan_1 = __importDefault(require("morgan"));
const booksRoutes_1 = __importDefault(require("./routes/booksRoutes"));
const singleBookRoutes_1 = __importDefault(require("./routes/singleBookRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, morgan_1.default)('tiny'));
// serve static
app.use('/', express_1.default.static('public/books-page'));
app.use('/book/:id', express_1.default.static('public/book-page'));
// serve static
app.use('/api/v1/books', booksRoutes_1.default);
app.use('/api/v1/book', singleBookRoutes_1.default);
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
