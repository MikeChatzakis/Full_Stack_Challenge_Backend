const mongoose = require('mongoose');
const logger = require('../config/logger');

const skillScema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true // Automatically handles createdAt and updatedAt fields
});

skillScema.post('save', function (doc) {
    logger.info(`Skill document saved: ${JSON.stringify(doc)}`);
});

skillScema.post('findOneAndDelete', function (doc) {
    logger.info(`Skill document removed: ${JSON.stringify(doc)}`);
});

const Skill=mongoose.model("Skill",skillScema);
module.exports = Skill;