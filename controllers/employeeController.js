const employeeService = require('../services/employeeServices');

//find() is what I want for late
// const this_skill = await Skill.findOne({_id: req.params.id});

//add 1 new employee
const create_employee_post = async (req,res) => {
    try {
        const newEmployee = await employeeService.createEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//-------------------------------------------------------------
const all_employees_get = async (req,res) => {
    
    try {
        //const employees = await EmployeeService.allEmployees();
        employees = await employeeService.allEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//-------------------------------------------------------------
const single_employee_get = async (req,res) => {
    try {
        const this_employee = await employeeService.singleEmployee(req.params.id);
        res.status(200).json(this_employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//-------------------------------------------------------------
const employee_delete = async (req,res) => {
    try {
        await employeeService.employeeDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//-------------------------------------------------------------
const employee_update_put = async (req,res) => {
    try {
        const updated_employee = await employeeService.employeeUpdate(req.params.id,req.body);
        res.status(200).json(updated_employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//-------------------------------------------------------------
const export_employees_to_excel_get = async (req, res) => {
    try {
        
        const workbook = await employeeService.employeesExport();

        // Set the response headers to trigger a download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'employees.xlsx'
        );

        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error generating Excel file');
        console.error(error);
    }
}
//-------------------------------------------------------------

module.exports = { create_employee_post, all_employees_get, single_employee_get, employee_delete, employee_update_put, export_employees_to_excel_get};