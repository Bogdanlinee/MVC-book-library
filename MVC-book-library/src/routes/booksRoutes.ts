import express from 'express';
import {getAllBooks, getBook} from '../controllers/booksController';

const router = express.Router();

router.route('').get(getAllBooks);
router.route('/:id').get(getBook);

export default router;