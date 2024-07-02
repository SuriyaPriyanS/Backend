// import express from 'express';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
// import { MongoClient, ObjectId } from 'mongodb';
// import stripe from 'stripe';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5007;

// // Middleware
// app.use(cors({
//   origin: [
//     'https://pet-adoption-platform-cc33e.web.app',
//     'http://localhost:5173'
//   ],
//   credentials: true,
//   optionSuccessStatus: 200
// }));
// app.use(cookieParser());
// app.use(express.json());

// // MongoDB Connection
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Stripe setup
// const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// // Middleware for logging
// const logger = (req, res, next) => {
//   console.log('Request:', req.method, req.url);
//   next();
// }

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).send({ message: 'Unauthorized access' });
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: 'Unauthorized access' });
//     }
//     req.user = decoded;
//     next();
//   });
// }

// // Routes and MongoDB collections setup
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('PetAdoption');
//     const PetCategoryCollection = database.collection('PetCategory');
//     const petsCollection = database.collection('pets');
//     const addAdoptCollection = database.collection('addtoadopt');
//     const addDonationCampCollection = database.collection('adddonationcamp');
//     const usersCollection = database.collection('users');
//     const paymentCollection = database.collection('payments');

//     // JWT Token handling endpoints
//     app.post('/jwt', async (req, res) => {
//       const user = req.body;
//       const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
//       res.cookie('token', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//       }).send({ success: true });
//     });

//     app.post('/logout', async (req, res) => {
//       res.clearCookie('token', {
//         maxAge: 0,
//         sameSite: 'none',
//         secure: true
//       }).send({ success: true });
//     });

//     // Pet related endpoints
//     app.get('/pets', async (req, res) => {
//       const cursor = petsCollection.find();
//       const pets = await cursor.toArray();
//       res.send(pets);
//     });

//     app.post('/pets', async (req, res) => {
//       const newPet = req.body;
//       const result = await petsCollection.insertOne(newPet);
//       res.send(result);
//     });

//     app.get('/pets/:id', async (req, res) => {
//       const petId = req.params.id;
//       try {
//         const result = await petsCollection.findOne({ _id: new ObjectId(petId) });
//         if (result) {
//           res.send(result);
//         } else {
//           res.status(404).send({ message: 'Pet not found' });
//         }
//       } catch (error) {
//         console.error('Error fetching pet data:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     app.put('/pets/:petId', async (req, res) => {
//       const petId = req.params.petId;
//       const filter = { _id: new ObjectId(petId) };
//       const updateDoc = {
//         $set: {
//           name: req.body.name,
//           image: req.body.image,
//           category: req.body.category,
//           age: req.body.age,
//           location: req.body.location,
//           shortdesp: req.body.shortdesp,
//           longdesp: req.body.longdesp,
//         }
//       };
//       try {
//         const result = await petsCollection.updateOne(filter, updateDoc);
//         res.send(result);
//       } catch (error) {
//         console.error('Error updating pet:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     app.delete('/pets/:id', async (req, res) => {
//       const petId = req.params.id;
//       const query = { _id: new ObjectId(petId) };
//       try {
//         const result = await petsCollection.deleteOne(query);
//         res.send(result);
//       } catch (error) {
//         console.error('Error deleting pet:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     // Donation campaign endpoints
//     app.get('/adddonationcamp', async (req, res) => {
//       try {
//         const cursor = addDonationCampCollection.find();
//         const donationCamps = await cursor.toArray();
//         res.send(donationCamps);
//       } catch (error) {
//         console.error('Error fetching donation camps:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     app.post('/adddonationcamp', async (req, res) => {
//       const newDonationCamp = req.body;
//       const result = await addDonationCampCollection.insertOne(newDonationCamp);
//       res.send(result);
//     });

//     app.get('/adddonationcamp/:id', async (req, res) => {
//       const donationCampId = req.params.id;
//       const query = { _id: new ObjectId(donationCampId) };
//       try {
//         const result = await addDonationCampCollection.findOne(query);
//         if (result) {
//           res.send(result);
//         } else {
//           res.status(404).send({ message: 'Donation camp not found' });
//         }
//       } catch (error) {
//         console.error('Error fetching donation camp:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     app.put('/updatedonationcamp/:id', async (req, res) => {
//       const donationCampId = req.params.id;
//       const query = { _id: new ObjectId(donationCampId) };
//       const updateDoc = {
//         $set: {
//           name: req.body.name,
//           image: req.body.image,
//           max_donation_limit: req.body.max_donation_limit,
//           last_donation_date: req.body.last_donation_date,
//           shortdesp: req.body.shortdesp,
//           longdesp: req.body.longdesp,
//           addedDate: req.body.addedDate,
//           userEmail: req.body.userEmail,
//           Pause: req.body.Pause,
//         }
//       };
//       try {
//         const result = await addDonationCampCollection.updateOne(query, updateDoc);
//         res.send(result);
//       } catch (error) {
//         console.error('Error updating donation camp:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     // User management endpoints
//     app.post('/users', async (req, res) => {
//       const newUser = req.body;
//       const query = { email: newUser.email };
//       const existingUser = await usersCollection.findOne(query);
//       if (existingUser) {
//         return res.send({ message: 'User already exists', insertedId: null });
//       }
//       const result = await usersCollection.insertOne(newUser);
//       res.send(result);
//     });

//     app.get('/users', async (req, res) => {
//       const cursor = usersCollection.find();
//       const users = await cursor.toArray();
//       res.send(users);
//     });

//     app.patch('/users/admin/:id', async (req, res) => {
//       const userId = req.params.id;
//       const query = { _id: new ObjectId(userId) };
//       const updateDoc = { $set: { role: 'Admin' } };
//       try {
//         const result = await usersCollection.updateOne(query, updateDoc);
//         res.send(result);
//       } catch (error) {
//         console.error('Error updating user to admin:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     // Payment endpoints
//     app.post('/create-payment-intent', async (req, res) => {
//       const { donationAmount } = req.body;
//       const amount = parseInt(donationAmount * 100);
//       try {
//         const paymentIntent = await stripeInstance.paymentIntents.create({
//           amount: amount,
//           currency: 'usd',
//           payment_method_types: ['card']
//         });
//         res.send({ clientSecret: paymentIntent.client_secret });
//       } catch (error) {
//         console.error('Error creating payment intent:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     app.post('/payments', async (req, res) => {
//       const payment = req.body;
//       try {
//         const paymentResult = await paymentCollection.insertOne(payment);
//         res.send({ paymentResult });
//       } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     app.get('/payments', async (req, res) => {
//       try {
//         const cursor = paymentCollection.find();
//         const payments = await cursor.toArray();
//         res.send(payments);
//       } catch (error) {
//         console.error('Error fetching payments:', error);
//         res.status(500).send({ message: 'Internal server error' });
//       }
//     });

//     // Start server
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } finally {
//     // Ensure the client closes when an error occurs
//     // await client.close();
//   }
// }

// run().catch(console.dir);

// export default app;

