import { Router } from 'express';
import {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
  getLatestOrder,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = Router();

router.post('/create-razorpay-order', createRazorpayOrder);
router.post('/verify-payment', verifyPaymentAndCreateOrder);
router.get('/latest', getLatestOrder);
router.get('/', getAllOrders);
router.patch('/:orderId/status', updateOrderStatus);

export default router;
