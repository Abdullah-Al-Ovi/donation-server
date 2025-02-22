import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    donatorEmail: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    amount: {
      type: String,
      required: true,
      trim: true
    },
    donatedField: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to DonationDetails
      ref: 'DonationDetails',
      required: true
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
