import express from 'express';
import {changeConversion, getConversion,} from '../controllers/conversionControllers';

const router = express.Router();

router.route('/:id').post(changeConversion);
router.route('/:id').get(getConversion);

export default router;