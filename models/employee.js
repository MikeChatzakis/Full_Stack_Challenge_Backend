const mongoose = require('mongoose');

const employeeScema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    dateAdded:{
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    }
})

const Employee=mongoose.model("Employee",employeeScema);
module.exports = Employee;