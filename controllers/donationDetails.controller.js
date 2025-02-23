import DonationDetails from '../models/donationDetails.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { fileUrl } from '../utils/constants.js';

export const addDonationDetails = asyncHandler(async (req, res) => {
    console.log(req.file);
    console.log(req.body);
   
    const fileUrlWithPath = req.file
        ? `${fileUrl}/images/${req.file.filename}`
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    const newDonationDetails = new DonationDetails({
       ...req.body,
        image: fileUrlWithPath,
    });

    const savedDonationDetails = await newDonationDetails.save();

    if (!savedDonationDetails) {
        throw new ApiError(500, "Donation details not saved");
    }

    return res.status(201).json(new ApiResponse(200, null, "Donation details added successfully"));
});

export const getAllDonationDetails = asyncHandler(async (req, res) => {
    const allDonations = await DonationDetails.find();

    if (allDonations.length === 0) {
        throw new ApiError(404, "Donations not found");
    }

    return res.status(200).json(new ApiResponse(200, allDonations, "Donations found successfully"));
});

export const getDonationDetailsById = asyncHandler(async (req, res) => {
    const donation = await DonationDetails.findById(req.params.id); 
    if (!donation) {
        throw new ApiError(404, "Donation not found");
    }
    return res.status(200).json(new ApiResponse(200, donation, "Donation found successfully"));
});

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await DonationDetails.distinct('category');

    if (categories.length === 0) {
        throw new ApiError(404, "Categories not found");
    }

    return res.status(200).json(new ApiResponse(200, categories, "Categories found successfully"));
});

export const getDonationDetailsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const donations = await DonationDetails.find({ category });

    if (donations.length === 0) {
        throw new ApiError(404, "Donations not found for the specified category");
    }

    return res.status(200).json(new ApiResponse(200, donations, "Donations found successfully"));
});

export const updateDonationDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Ensure the donation exists
    const donation = await DonationDetails.findById(id);
    if (!donation) {
        throw new ApiError(404, "Donation not found");
    }

    // Update only provided fields in req.body
    const updatedDonation = await DonationDetails.findByIdAndUpdate(
        id,
        { $set: req.body },  // Updates only the given fields
        { new: true, runValidators: true }
    );

    return res.status(200).json(new ApiResponse(200, updatedDonation, "Donation updated successfully"));
});


