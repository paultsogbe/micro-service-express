// const express = require('express');
// const mongoose = require('mongoose');
// const productRoutes = require('./app/routes/productRoute');
// const { config } = require('dotenv');
// const app = express();

// require('dotenv').config();

// app.use(express.json());

// console.log('MONGODB_URL:', process.env.MONGODB_URL);

// mongoose.connect(process.env.MONGODB_URL, {ssl: process.env.MONGO_SSL})
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('Could not connect to MongoDB', error));
// // Route de Product
// app.use('/', productRoutes);


// const PORT = process.env.PORT || 8082;
// app.listen(8082, () => {
//   console.log(`ProductService Server is running on port ${PORT} `);
// });


require("dotenv").config();
const app = require("./app.js");

const PORT = process.env.PORT || 8082;

app.get("/", (req, res) => {
    res.send("Welcome to the products microservice !")
})

app.listen(PORT, () => {
    console.log(`Products microservice is listening on ${PORT}`)
})
