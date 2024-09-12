const EmpSkServices=require('../services/employeeSkillServices');


//add 1 new relation between an employee and a skill
const create_emp_skill_post = async (req, res) => {
    try{
        const newRelation = EmpSkServices.createEmpSkRelation(req.body);
        res.status(201).json(newRelation);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

//add many relations between 1 employee and many skills
const create_many_skills_post = async (req, res) => {
    const {newUserID, EmployeeSkills} = req.body;

    try{
        EmpSkServices.createManyEmpSkRelations(newUserID,EmployeeSkills);
        res.status(201).json({message: 'Relations Added succesfully'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

//return all employee-skill relations in an array -- NOT USED YET
const all_emp_all_skills_get = async (req,res) => {
    try {
        const employeeSkills = await EmpSkServices.allEmpSkRelations();
        res.status(200).json(employeeSkills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//return all Skills for a Single employee
const single_employee_all_skills_get = async (req,res) => {
    try {
        const fullSkillList = await EmpSkServices.singleEmpAllSkRelations(req.params.id);
        res.status(200).json(fullSkillList);
    } catch (err) {
        if(err.message.includes('No Skills Found for this Employee'))
            res.status(404).json({ message: err.message });
        else
            res.status(500).json({ message: err.message });
    }
}

//when employee is deleted, also delete associated entries. This is triggered by a middleware
const delete_entries_when_employee_is_deleted = async (req,res) => {
    try {
        await EmpSkServices.deleteEmpSkByEmp(req.params.id);
    } catch (err) {
        throw new Error(`${err.message}`);
    }
}
// when skill is deleted, also delete associated entries. This is triggered by a middleware
const delete_entries_when_skill_is_deleted = async (req,res) => {
    try {
        await EmpSkServices.deleteEmpSkBySk(req.params.id);
    } catch (err) {
        throw new Error(`${err.message}`);
    }
}

const employee_skill_delete = async (req,res) => {
    try {
        await EmpSkServices.deleteEmpSk(req.params.employeeId,req.params.skillId);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

const export_emp_skill_relations_to_excel_get = async (req, res) => {
    try {
        // Fetch data from the database
        const workbook = await EmpSkServices.EmpSkExport();
        
        // Set the response headers to trigger a download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'relations.xlsx'
        );
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
