import express from 'express';

import { imageUpload } from '../middlewares/multer.middleware.js';
import { addDonationDetails, getAllDonationDetails, getDonationDetailsById, updateDonationDetails } from '../controllers/donationDetails.controller.js';

const router = express.Router();

router.post('/addDonationDetails',imageUpload.single("image"), addDonationDetails);

router.get('/getAllDonations', getAllDonationDetails);

router.get('/getSingleDonation/:id', getDonationDetailsById);

router.patch("/updateDonation/:id", updateDonationDetails);

export default router;
