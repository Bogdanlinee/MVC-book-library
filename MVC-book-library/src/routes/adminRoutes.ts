import express from 'express';
import auth from '../middlewares/authMiddleware';
import {getAllBooks, createOneBook, deleteOneBook} from '../controllers/adminController';

const router = express.Router();

router.route('/').post(auth, createOneBook);

export default router;