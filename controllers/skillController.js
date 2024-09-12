const SkillService = require('../services/skillServices');

//should make a handle error function

//add 1 new skill
const create_skill_post = async (req, res) => {
    try{
        const newSkill = await SkillService.createSkill(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

//return all skills in an array
const all_skills_get = async (req,res) => {
    try {
        const skills = await SkillService.allSkills();
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//return a single skill using ID
const single_skill_get = async (req,res) => {
    try {
        const this_skill = await SkillService.singleSkill(req.params.id);
        res.status(200).json(this_skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const skill_delete = async (req,res) => {
    try {
        SkillService.skillDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const skill_update_put = async (req,res) => {
    try {
        const updated_skill = await SkillService.skillUpdate(req.params.id,req.body);
        res.status(200).json(updated_skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const export_skills_to_excel_get = async (req, res) => {
    try {

        const workbook = await SkillService.skillsExport();
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

