const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});



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
