const Skill = require('../models/skill');


//should make a handle error function


//add 1 new skill
const createSkill_post = async (req, res) => {
    const {name, dateCreated, details} = req.body;

    try{
        const newSkill = new Skill({name,dateCreated,details});
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

//return all skills in an array
const getAllSkills_get = async (req,res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { createSkill_post, getAllSkills_get };