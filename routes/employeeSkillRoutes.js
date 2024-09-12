const express = require('express');
const { create_emp_skill_post, create_many_skills_post, all_emp_all_skills_get, single_employee_all_skills_get,employee_skill_delete,export_emp_skill_relations_to_excel_get} = require('../controllers/employeeSkillController');

const router = express.Router();


router.post('/employee-skills/bulk', create_many_skills_post);
router.get('/employee-skills/export', export_emp_skill_relations_to_excel_get);
router.delete('/employee-skills/:employeeId/:skillId', employee_skill_delete);
router.get('/employee-skills/:id', single_employee_all_skills_get);
router.get('/employee-skills', all_emp_all_skills_get);
router.post('/employee-skills', create_emp_skill_post);

module.exports = router;