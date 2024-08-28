const Employee_Skill = require('../models/employee_skill');
const Skill = require('../models/skill');
const logger = require('../config/logger');
const ExcelJS = require('exceljs');


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
        if(EmployeeSkills.length===0){
            console.log("Nothing to add");
        }
        else{
            const elementsToAdd = EmployeeSkills.map(skill => ({
                employee: newUserID,
                skill: skill
            }));
            
            const added_elements=await Employee_Skill.insertMany(elementsToAdd);
            logger.info(`Employee-Skill relations Added: ${JSON.stringify(added_elements)}`);
        }
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
        const this_emp_skills = (await Employee_Skill.find({employee: req.params.id})).map(item =>({skill: item.skill, obtainedAt: item.createdAt}));

        if(!Array.isArray(this_emp_skills) || this_emp_skills.length===0)
            return res.status(404).json({message:"No Skills Found for this Employee"});
        
        //find the full Data for each of those skills
        let fullSkillList = await Skill.find({
            _id:{$in: this_emp_skills.map(item => item.skill)}
        })
        fullSkillList = fullSkillList.map(skill => {
            const matchingSkill = this_emp_skills.find(empSkill => empSkill.skill.toString() === skill._id.toString());
            return{
                ...skill._doc,
                dateAdded: matchingSkill ? matchingSkill.obtainedAt : null
            }
        })        
        res.status(200).json(fullSkillList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//when employee is deleted, also delete associated entries. This is triggered by a middleware
const delete_entries_when_employee_is_deleted = async (req,res) => {
    try {
        const removed_elements = await Employee_Skill.deleteMany({employee:req.params.id});
        logger.info(`Employee-Skill relations deleted: ${JSON.stringify(removed_elements)}`);
    } catch (err) {
        throw new Error(`Error deleting employee skills: ${err.message}`);
    }
}
// when skill is deleted, also delete associated entries. This is triggered by a middleware
const delete_entries_when_skill_is_deleted = async (req,res) => {
    try {
        const removed_elements = await Employee_Skill.deleteMany({skill:req.params.id});
        logger.info(`Employee-Skill relations deleted: ${JSON.stringify(removed_elements)}`);
    } catch (err) {
        throw new Error(`Error deleting employee skills: ${err.message}`);
    }
}

const employee_skill_delete = async (req,res) => {
    try {
        const { emp_key, skill_key } = req.query;
        const removed_elements = await Employee_Skill.findOneAndDelete({employee:emp_key, skill:skill_key});
        logger.info(`Employee-Skill relations deleted: ${JSON.stringify(removed_elements)}`);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

const export_emp_skill_relations_to_excel_get = async (req, res) => {
    try {
        // Fetch data from the database
        const relations = await Employee_Skill.find().lean(); // Using lean() for plain JavaScript objects

        // Create a new Excel workbook and add a worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relations');

        // Define the columns
        worksheet.columns = [
            { header: 'Employee id', key: 'employee', width: 30 },
            { header: 'Skill id', key: 'skill', width: 30 },
            { header: 'Aquired at', key: 'createdAt', width: 20 }
        ];

        // Add rows to the worksheet
        relations.forEach(relation => {
            worksheet.addRow({
                employee: relation.employee,
                skill: relation.skill,
                createdAt: relation.createdAt ? relation.createdAt.toLocaleDateString('el-GR') : '',
            });
        });

        // Set the response headers to trigger a download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'relations.xlsx'
        );
        //res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        // Write the workbook to the response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error generating Excel file');
        console.error(error);
    }
}




module.exports = { create_emp_skill_post, create_many_skills_post, all_emp_all_skills_get, single_employee_all_skills_get,delete_entries_when_employee_is_deleted,delete_entries_when_skill_is_deleted,employee_skill_delete,export_emp_skill_relations_to_excel_get};
