import express from 'express';
import {
  getOrders,
  createOrder,
  getTransporters,
  getStorages,
  bookStorage
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', createOrder);

router.get('/transporters', getTransporters);

router.get('/storages', getStorages);
router.post('/storages/book', bookStorage);

export default router;

