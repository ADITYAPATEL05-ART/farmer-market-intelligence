import express from 'express';
import {
  getLots,
  createLot,
  submitOffer,
  getDemands,
  createDemand
} from '../controllers/produceController.js';

const router = express.Router();

router.get('/lots', getLots);
router.post('/lots', createLot);
router.post('/lots/:id/offers', submitOffer);

router.get('/demands', getDemands);
router.post('/demands', createDemand);

export default router;

