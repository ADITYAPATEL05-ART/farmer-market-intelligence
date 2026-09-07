import express from 'express';
import { getCrops, getPrices, getForecast } from '../controllers/mandiController.js';

const router = express.Router();

router.get('/crops', getCrops);
router.get('/prices', getPrices);
router.get('/forecast', getForecast);

export default router;

