import express from 'express';
import getAllBooks from '../controllers/booksController';

const router = express.Router();

router.route('').get(getAllBooks);

export default router;