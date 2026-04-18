import { Router } from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} from '../controllers/wishlistController.js';

const router = Router();

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.get('/:productId/check', isWishlisted);

export default router;
