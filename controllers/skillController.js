const Skill = require('../models/skill');


//should make a handle error function


//add 1 new skill
const create_skill_post = async (req, res) => {
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
const all_skills_get = async (req,res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//return a single skill using ID
const single_skill_get = async (req,res) => {
    try {
        const this_skill = await Skill.findById(req.params.id);
        res.status(200).json(this_skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const skill_delete = async (req,res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const skill_update_put = async (req,res) => {
    try {
        const updated_skill = await Skill.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            details: req.body.details
        });
        res.status(200).json(updated_skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { create_skill_post, all_skills_get, single_skill_get, skill_delete, skill_update_put};

