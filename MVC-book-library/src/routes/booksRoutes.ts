import express from 'express';
import {getAllBooks, getBook, createOneBook, deleteOneBook} from '../controllers/booksController';
import auth from '../middlewares/authMiddleware';
import multer from 'multer';

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
router.route('/:id/remove').get(auth, deleteOneBook);

export default router;