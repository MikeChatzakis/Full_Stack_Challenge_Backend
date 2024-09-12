const SkillRepository = require('../repositories/SkillRepository');
const ExcelJS = require('exceljs');

class SkillServices {
    constructor(skillRepository){
        this.skillRepository=skillRepository;
    }

    async createSkill(skill_data){
        try{
            const newSkill = await this.skillRepository.create(skill_data);
            return newSkill;
        } catch(err){
            throw new Error(err.message);
        }
    }

    async allSkills() {
        try {
            const skills= await this.skillRepository.find();
            return skills;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async singleSkill(id){
        try {
            const this_skill = await this.skillRepository.findById(id);
            return this_skill;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async skillDelete(id){
        try {
            await this.skillRepository.delete(id);
            return null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async skillUpdate(id,skill_data){
        try {
            const updated_skill = await this.skillRepository.update(id,skill_data);
            return updated_skill;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async skillsExport(){
        try {
            // Fetch data from the database
            const skills = await this.skillRepository.find({},true);
            // Create a new Excel workbook and add a worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Skills');
    
            // Define the columns
            worksheet.columns = [
                { header: 'Skill Name', key: 'name', width: 20 },
                { header: 'Skill details', key: 'details', width: 20 },
                { header: 'Created At', key: 'createdAt', width: 20 },
                { header: 'Updated At', key: 'updatedAt', width: 20 }
            ];
    
            // Add rows to the worksheet
            skills.forEach(skill => {
                worksheet.addRow({
                    name: skill.name,
                    details: skill.details,
                    createdAt: skill.createdAt ? skill.createdAt.toLocaleDateString('el-GR') : '',
                    updatedAt: skill.updatedAt ? skill.updatedAt.toLocaleDateString('el-GR') : ''
                });
            });
            return workbook;
        } catch (err) {
            throw new Error('Error generating Excel file: ' + err.message);
        }   
    }  
}

module.exports = new SkillServices(SkillRepository);
