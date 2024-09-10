const express = require('express');
const { create_employee_post, all_employees_get, single_employee_get, employee_delete,employee_update_put,export_employees_to_excel_get} = require('../controllers/employeeController');
const {delete_relations_employee} = require('../middleware/trigger_after_delete');

const router = express.Router();

router.get('/employees/export', export_employees_to_excel_get);
router.get('/employees/:id', single_employee_get);
router.delete('/employees/:id',delete_relations_employee, employee_delete);
router.patch('/employees/:id', employee_update_put);
router.get('/employees', all_employees_get);
router.post('/employees', create_employee_post);

module.exports = router;
