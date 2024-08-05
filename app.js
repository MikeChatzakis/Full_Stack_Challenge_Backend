const express = require('express');
const connectDB = require('./config/db');

const dotenv = require('dotenv');

const skillRoutes = require('./routes/skillRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const { connect } = require('mongoose');

const cors = require('cors');

dotenv.config();
const app = express();

//connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', skillRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
