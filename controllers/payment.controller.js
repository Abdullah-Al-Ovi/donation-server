import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import Payment from "../models/payment.model.js";
import DonationDetails from "../models/donationDetails.model.js"; 

export const addPayment = asyncHandler(async (req, res) => {
    const newPayment = new Payment({
        ...req.body
    });

    const savedPayment = await newPayment.save();

    if (!savedPayment) {
        throw new ApiError(500, "Payment details not saved");
    }

    return res.status(201).json(new ApiResponse(200, null, "Payment details added successfully"));
});

export const getAllPayments = asyncHandler(async (req, res) => {
    const allPayments = await Payment.find()
                                      .populate("donatedField") 
                                      .sort({ createdAt: -1 }); 

    if (allPayments.length === 0) { 
        throw new ApiError(404, "No payments found");
    }

    return res.status(200).json(new ApiResponse(200, allPayments, "Payments retrieved successfully"));
});
