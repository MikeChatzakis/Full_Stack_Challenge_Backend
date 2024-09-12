const employee_skillRepository = require('../repositories/Employee_skillRepository');
const skillRepository = require('../repositories/SkillRepository');


const ExcelJS = require('exceljs');
const logger = require('../config/logger');

class EmpSkServices {
    constructor(empSkRepository,skillRepository){
        this.empSkRepository=empSkRepository;
        this.skillRepository=skillRepository;
    }

    async createEmpSkRelation(relation_data){
        try{
            const newRelation = await this.empSkRepository.create(relation_data);
            return newRelation;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async createManyEmpSkRelations (employee_id,skill_data) {

        try{
            if(skill_data.length===0){
                console.log("Nothing to add");
            }
            else{
                const elementsToAdd = skill_data.map(skill => ({
                    employee: employee_id,
                    skill: skill
                }));
                const added_elements = await this.empSkRepository.insertBulk(elementsToAdd);
                logger.info(`Employee-Skill relations Added: ${JSON.stringify(added_elements)}`);
            }
            return null;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async allEmpSkRelations () {
        try {
            const employeeSkills = await this.empSkRepository.find();
            return employeeSkills;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async singleEmpAllSkRelations(id){
        try {
            //find all the skills for this employee from the relation table
            const this_emp_skills = (await this.empSkRepository.find({employee:id})).map(item =>({skill: item.skill, obtainedAt: item.createdAt}));
            if(!Array.isArray(this_emp_skills) || this_emp_skills.length===0)
                throw new Error('No Skills Found for this Employee');
            
            //find the full Data for each of those skills
            let fullSkillList = await this.skillRepository.find({_id:{$in: this_emp_skills.map(item => item.skill)}});

            fullSkillList = fullSkillList.map(skill => {
                const matchingSkill = this_emp_skills.find(empSkill => empSkill.skill.toString() === skill._id.toString());
                
                return{
                    ...skill,
                    dateAdded: matchingSkill ? matchingSkill.obtainedAt : null
                }
            });

            return fullSkillList;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteEmpSkByEmp (id) {
        try {
            const removed_elements = await this.empSkRepository.deleteBulk({employee:id});
            console.log(removed_elements);
            logger.info(`Employee-Skill relations deleted: ${JSON.stringify(removed_elements)}`);
            return null;
        } catch (err) {
            throw new Error(`Error deleting employee skills: ${err.message}`);
        }
    }

    async deleteEmpSkBySk(id){
        try {
            const removed_elements = await this.empSkRepository.deleteBulk({skill:id});
            logger.info(`Employee-Skill relations deleted: ${JSON.stringify(removed_elements)}`);
            return null;
        } catch (err) {
            throw new Error(`Error deleting employee skills: ${err.message}`);
        }
    }

    async deleteEmpSk (employee_id,skill_id){
        try {
            const removed_elements = await this.empSkRepository.deleteSpecific({employee: employee_id, skill: skill_id});
            logger.info(`Employee-Skill relations deleted: ${JSON.stringify(removed_elements)}`);
            return null;
        } catch (error) {
            throw new Error(`Error deleting employee skills: ${err.message}`);
        }
    }

    async EmpSkExport(){
        try {
            // Fetch data from the database
            const relations = await this.empSkRepository.find({},true);
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
            return workbook;
        } catch (error) {
            throw new Error('Error generating Excel file: ' + error.message);
        }
    }
}


module.exports = new EmpSkServices(employee_skillRepository,skillRepository);


