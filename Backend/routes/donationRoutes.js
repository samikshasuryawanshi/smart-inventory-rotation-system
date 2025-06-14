import express from 'express';
import { getDonations } from '../controllers/donationController.js';
const router = express.Router();

router.get('/', getDonations);

export default router;
