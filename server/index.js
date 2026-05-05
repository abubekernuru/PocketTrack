const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(express.json());
const authRoute = require('./routes/auth.route.js');
const transactionRoute = require('./routes/transaction.route.js');
app.use('/api/auth', authRoute);
app.use('/api/transactions', transactionRoute);



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
