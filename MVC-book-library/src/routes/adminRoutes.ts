import express, {} from 'express';
import {logout} from '../controllers/adminController';

const router = express.Router();
router.route('/logout').get(logout);

export default router;