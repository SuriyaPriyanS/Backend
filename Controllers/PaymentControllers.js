import { ObjectId } from 'mongodb';
import stripe from 'stripe';
import Payment from '../Models/Paymentschema.js';

// Initialize Stripe with your secret key
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
const createPaymentIntent = async (req, res) => {
  const { donationAmount, image, name, ownerEmail } = req.body;
  const amount = parseInt(donationAmount * 100);

  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: `Donation for ${name}`,
      receipt_email: ownerEmail,
      metadata: {
        image: image,
        name: name,
        ownerEmail: ownerEmail
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Save payment details
const savePayment = async (req, res) => {
  const payment = req.body;
  try {
    const paymentResult = await Payment.create(payment);
    res.send({ paymentResult });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Payment.deleteOne({ _id: ObjectId(id) });
    res.send(result);
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

export {
  createPaymentIntent,
  savePayment,
  getPayments,
  deletePayment
};
