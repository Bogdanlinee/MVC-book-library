"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
router.route('/').post(authMiddleware_1.default, adminController_1.createOneBook);
exports.default = router;
