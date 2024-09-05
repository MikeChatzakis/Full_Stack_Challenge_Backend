const express = require('express');
const connectDB = require('./config/db');

const dotenv = require('dotenv');

const skillRoutes = require('./routes/skillRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const employeeSkillRoutes = require('./routes/employeeSkillRoutes');

const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkAdmin } = require('./middleware/auth_middleware');


const { connect } = require('mongoose');

const cookieParser = require('cookie-parser');


const cors = require('cors');

dotenv.config();
const app = express();

//connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, //need this to be able to send cookies(res.cookie). At the moment I am sending the token over the response body so this is not required, but could potentially be usedful
}));

app.use(cookieParser()); //also not needed for the same reason as above, but is needed if sending cookies in res.cookie

//Routes

//app.get('*', checkAdmin);

app.use('/api', authRoutes)
app.use('/api', requireAuth, skillRoutes);
app.use('/api', requireAuth, employeeRoutes);
app.use('/api', requireAuth, employeeSkillRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
