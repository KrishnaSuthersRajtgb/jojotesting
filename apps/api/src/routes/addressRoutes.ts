import { Router } from 'express';
import { getAddress, saveAddress, deleteAddress } from '../controllers/addressController.js';

const router = Router();

router.get('/', getAddress);
router.post('/', saveAddress);
router.delete('/', deleteAddress);

export default router;
