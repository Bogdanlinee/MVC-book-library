import express from 'express';
import getBook from '../controllers/singleBookController';

const router = express.Router();

router.route('/:id').get(getBook);

export default router;