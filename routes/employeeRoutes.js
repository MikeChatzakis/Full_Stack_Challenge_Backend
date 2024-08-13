const express = require('express');
const { create_employee_post, all_employees_get, single_employee_get, employee_delete,employee_update_put} = require('../controllers/employeeController');
const {delete_relations_employee} = require('../middleware/trigger_after_delete');

const router = express.Router();

router.post('/addEmployee', create_employee_post);
router.get('/Employees_list', all_employees_get);
router.get('/employee/:id', single_employee_get);
router.delete('/employee/:id',delete_relations_employee, employee_delete);
router.patch('/employee/:id', employee_update_put);

module.exports = router;
