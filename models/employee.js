const mongoose = require('mongoose');
const logger = require('../config/logger');

const employeeScema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    street: {
        type: String,
        required: false,
        trim: true
    },
    city: {
        type: String,
        required: false,
        trim: true
    },
    state: {
        type: String,
        required: false,
        trim: true
    },
    postalCode: {
        type: String,
        required: false,
        trim: true
    },
    country: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: { //represents Hire Date
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true // Automatically handles createdAt and updatedAt fields)
});

employeeScema.post('save', function (doc) {
    logger.info(`Employee document saved: ${JSON.stringify(doc)}`);
});

employeeScema.post('findOneAndDelete', function (doc) {
    logger.info(`Employee document removed: ${JSON.stringify(doc)}`);
});

const Employee=mongoose.model("Employee",employeeScema);
module.exports = Employee;