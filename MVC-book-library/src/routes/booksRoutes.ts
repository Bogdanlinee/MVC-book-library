import express from 'express';
import {getAllBooks, getBook, createOneBook} from '../controllers/booksController';
import auth from '../middlewares/authMiddleware';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
})

const upload = multer({storage: storage});

router.route('/').get(getAllBooks);
router.route('/').post(auth, upload.single('image'), createOneBook);
router.route('/:id').get(getBook);

export default router;