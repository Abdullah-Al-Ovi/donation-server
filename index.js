import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './utils/connectDB.js';
import donationDetailsRoutes from "./routes/donationDetails.route.js"
import paymentRoutes from "./routes/payment.router.js"
dotenv.config();

connectDB();

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });
app.get("/",(req,res)=>{
  {
    res.send("Hello World");
  }
})
app.use(express.json());
app.use(express.static('public'));

app.use(cookieParser());

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
});
app.use('/api/donation', donationDetailsRoutes);
app.use('/api/payment', paymentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
