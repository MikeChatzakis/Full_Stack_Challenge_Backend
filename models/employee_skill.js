const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee_skillScema = new mongoose.Schema({
    employee:{
        type: Schema.Types.ObjectId, 
        ref:'Employee',
        required: true
    },
    skill:{
        type: Schema.Types.ObjectId,
        ref:'Skill',
        required: true,
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
});

const Employee_Skill=mongoose.model("Employee_Skill",employee_skillScema);
module.exports = Employee_Skill;