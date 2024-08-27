const Skill = require('../models/skill');
const ExcelJS = require('exceljs');

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

const export_skills_to_excel_get = async (req, res) => {
    try {
        // Fetch data from the database
        const skills = await Skill.find().lean(); // Using lean() for plain JavaScript objects

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

        // Set the response headers to trigger a download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'skills.xlsx'
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

module.exports = { create_skill_post, all_skills_get, single_skill_get, skill_delete, skill_update_put,export_skills_to_excel_get};

