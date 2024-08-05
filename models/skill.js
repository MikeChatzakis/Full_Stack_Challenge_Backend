const mongoose = require('mongoose');

const skillScema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    details: {
        type: String,
        required: true
    }
})

const Skill=mongoose.model("Skill",skillScema);
module.exports = Skill;