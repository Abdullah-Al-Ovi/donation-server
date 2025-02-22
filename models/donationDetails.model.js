import mongoose from 'mongoose';

const donationDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    image: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    status: {
      type: String,
      enum: ['running', 'closed', 'upcoming'],
      default: 'running',
      required: true
    }
  },
  { timestamps: true }
);

const DonationDetails = mongoose.model('DonationDetails', donationDetailsSchema);

export default DonationDetails;