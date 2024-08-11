const express = require('express');
const { create_emp_skill_post, create_many_skills_post, all_emp_all_skills_get, single_employee_all_skills_get, emp_skill_delete} = require('../controllers/employeeSkillController');

const router = express.Router();

router.post('/addEmpSkill', create_emp_skill_post);
router.post('/addManyEmpSkills', create_many_skills_post);
router.get('/AllEmployeesAllSkills', all_emp_all_skills_get);
router.get('/SingleEmployeeAllSkills/:id', single_employee_all_skills_get);
router.delete('/emp-skill/:id',emp_skill_delete);

module.exports = router;