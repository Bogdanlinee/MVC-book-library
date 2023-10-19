"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const router = express_1.default.Router();
router.route('').get(booksController_1.getAllBooks);
router.route('/:id').get(booksController_1.getBook);
exports.default = router;
