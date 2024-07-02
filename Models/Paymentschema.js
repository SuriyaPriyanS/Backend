import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  email: { type: String, required: true },
  image: { type: String },
  name: { type: String },
  donationId: { type: Schema.Types.ObjectId },
  donationAmount: { type: Number },
  transactionId: { type: String },
  ownerEmail: { type: String },
  max_donation_limit: { type: Number },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' }
});

const Payment = model('Payment', paymentSchema);

export default Payment;
