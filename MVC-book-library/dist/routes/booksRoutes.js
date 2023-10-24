"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.route('/').get(booksController_1.getAllBooks);
router.route('/').post(authMiddleware_1.default, upload.single('image'), booksController_1.createOneBook);
router.route('/:id').get(booksController_1.getBook);
exports.default = router;
