const Employee_Skill = require('../models/employee_skill');
const Skill = require('../models/skill');


//add 1 new relation between an employee and a skill
const create_emp_skill_post = async (req, res) => {
    const {employee, skill} = req.body;

    try{
        const newRelation = new Employee_Skill({employee,skill});
        await newRelation.save();
        res.status(201).json(newRelation);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

//add many relations between 1 employee and many skills
const create_many_skills_post = async (req, res) => {
    const {newUserID, EmployeeSkills} = req.body;

    try{
        
        const elementsToAdd = EmployeeSkills.map(skill => ({
            employee: newUserID,
            skill: skill
        }));
        
        await Employee_Skill.insertMany(elementsToAdd);

        res.status(201).json({message: 'Added succesfully'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

//return all employee-skill relations in an array -- NOT USED YET
const all_emp_all_skills_get = async (req,res) => {
    try {
        const employeeSkills = await Employee_Skill.find();
        res.status(200).json(employeeSkills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//return all Skills for a Single employee
const single_employee_all_skills_get = async (req,res) => {

    try {
        //find all the skills for this employee from the relation table
        const this_emp_skills = (await Employee_Skill.find({employee: req.params.id})).map(item => item.skill);

        if(!Array.isArray(this_emp_skills) || this_emp_skills.length===0)
            return res.status(404).json({message:"No Skills Found for this Employee"});

        //find the full Data for each of those skills
        const fullSkillList = await Skill.find({
            _id:{$in: this_emp_skills}
        })

        res.status(200).json(fullSkillList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//delete a skill form the DB
const delete_entries_when_employee_is_deleted = async (req,res) => {
    try {
        console.log("deleting many skill delete");
        await Employee_Skill.deleteMany({employee:req.params.id});
        console.log("deleted");
    } catch (err) {
        throw new Error(`Error deleting employee skills: ${err.message}`);
    }
}
const delete_entries_when_skill_is_deleted = async (req,res) => {
    try {
        console.log("deleting many skill delete");
        await Employee_Skill.deleteMany({skill:req.params.id});
        console.log("deleted");

    } catch (err) {
        throw new Error(`Error deleting employee skills: ${err.message}`);
    }
}





module.exports = { create_emp_skill_post, create_many_skills_post, all_emp_all_skills_get, single_employee_all_skills_get,delete_entries_when_employee_is_deleted,delete_entries_when_skill_is_deleted};
