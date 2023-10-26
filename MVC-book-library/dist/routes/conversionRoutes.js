"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversionControllers_1 = require("../controllers/conversionControllers");
const router = express_1.default.Router();
router.route('/:id').post(conversionControllers_1.changeConversion);
router.route('/:id').get(conversionControllers_1.getConversion);
exports.default = router;
