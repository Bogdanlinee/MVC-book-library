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
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const conversionRoutes_1 = __importDefault(require("./routes/conversionRoutes"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// serve static
app.use('/', express_1.default.static('public/books-page'));
app.use('/book/:id', express_1.default.static('public/book-page'));
app.use('/admin', authMiddleware_1.default, express_1.default.static('public/admin-page'));
app.use('/images', express_1.default.static('public/images'));
app.use('/api/v1/books', booksRoutes_1.default);
app.use('/admin/api/v1', adminRoutes_1.default);
app.use('/api/v1/conversion', conversionRoutes_1.default);
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
