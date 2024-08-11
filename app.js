const express = require('express');
const connectDB = require('./config/db');

const dotenv = require('dotenv');

const skillRoutes = require('./routes/skillRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const employeeSkillRoutes = require('./routes/employeeSkillRoutes');
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
app.use('/api', employeeRoutes);
app.use('/api', employeeSkillRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
