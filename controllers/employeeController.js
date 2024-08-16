const Employee = require('../models/employee');
const ExcelJS = require('exceljs');

//find() is what I want for late
// const this_skill = await Skill.findOne({_id: req.params.id});


//add 1 new employee
const create_employee_post = async (req,res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const all_employees_get = async (req,res) => {
    
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const single_employee_get = async (req,res) => {
    try {
        const this_employee = await Employee.findById(req.params.id);
        res.status(200).json(this_employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const employee_delete = async (req,res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const employee_update_put = async (req,res) => {
    //const {name, surname, phone,email} = req.body;
    try {
        const updated_employee = await Employee.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json(updated_employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const export_employees_to_excel_get = async (req, res) => {
    try {
        // Fetch data from the database
        const employees = await Employee.find().lean(); // Using lean() for plain JavaScript objects

        // Create a new Excel workbook and add a worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employees');

        // Define the columns
        worksheet.columns = [
            { header: 'First Name', key: 'firstName', width: 20 },
            { header: 'Last Name', key: 'lastName', width: 20 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Date of Birth', key: 'dateOfBirth', width: 20 },
            { header: 'Street', key: 'street', width: 30 },
            { header: 'City', key: 'city', width: 20 },
            { header: 'State', key: 'state', width: 20 },
            { header: 'Postal Code', key: 'postalCode', width: 15 },
            { header: 'Country', key: 'country', width: 20 },
            { header: 'Hire Date', key: 'createdAt', width: 20 },
            { header: 'Last Update', key: 'updatedAt', width: 20 }
        ];

        // Add rows to the worksheet
        employees.forEach(employee => {
            worksheet.addRow({
                firstName: employee.firstName,
                lastName: employee.lastName,
                phone: employee.phone,
                email: employee.email,
                dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toLocaleDateString('el-GR') : '',
                street: employee.street || '', // Default to empty string if not present
                city: employee.city || '',
                state: employee.state || '',
                postalCode: employee.postalCode || '',
                country: employee.country || '',
                createdAt: employee.createdAt ? employee.createdAt.toLocaleDateString('el-GR') : '',
                updatedAt: employee.updatedAt ? employee.updatedAt.toLocaleDateString('el-GR') : ''
            });
        });

        // Set the response headers to trigger a download
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'employees.xlsx'
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

module.exports = { create_employee_post, all_employees_get, single_employee_get, employee_delete, employee_update_put, export_employees_to_excel_get};