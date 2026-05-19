const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();


const FRONTEND_URL = (process.env.FRONTEND_URL || '').replace(/\/$/, '');
const rawOrigins = [
    process.env.FRONTEND_URL,         
    process.env.ALLOWED_ORIGINS,       
    'http://localhost:5173',          
    'http://localhost:5174',           
    'http://localhost:3000',          
].join(',');

const allowedOrigins = rawOrigins
  .split(',')
  .map(s => s.trim().replace(/\/$/, ''))   
  .filter(Boolean);

  app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser (curl, mobile) requests
    if (!origin) return callback(null, true);

    const isWhitelisted = allowedOrigins.includes(origin);
    const isVercelPreview = origin && origin.endsWith('.vercel.app'); // optional

    if (isWhitelisted || isVercelPreview) return callback(null, true);

    console.warn('[CORS] Blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


const authRoute = require('./routes/auth.route.js');
const userRoute = require('./routes/user.route.js');
const transactionRoute = require('./routes/transaction.route.js');
const analyticsRoute = require('./routes/analytics.route.js');
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/v1/transactions', transactionRoute);
app.use('/api/v1/analytics', analyticsRoute);



const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Succesfully connected to mongodb Db!")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
    console.log("Database connection failed:", err);
  });

  
// error handler middleware
app.use((err, req, res, next)=> {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
})
