import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController.js';

const router = Router();

router.get('/', getCart); // ✅ no userId in URL
router.post('/add', addToCart);
router.put('/item/:itemId', updateCartItem);
router.delete('/item/:itemId', removeCartItem);
router.delete('/clear', clearCart); // ✅ no userId in URL

export default router;
