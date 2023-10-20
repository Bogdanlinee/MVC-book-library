import express from 'express';
import {getAllBooks, getBook, createOneBook} from '../controllers/booksController';
import auth from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/').post(auth, createOneBook);
router.route('/:id').get(getBook);

export default router;