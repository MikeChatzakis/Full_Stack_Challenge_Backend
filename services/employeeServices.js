const employeeRepository = require('../repositories/employeeRepository');
const ExcelJS = require('exceljs');

class EmployeeServices {
    constructor(employeeRepository){
        this.employeeRepository=employeeRepository;
    }

    async createEmployee(employee_data){
        try {
            const newEmployee = await this.employeeRepository.create(employee_data);
            return newEmployee;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async allEmployees() {
        try {
            const employees = await this.employeeRepository.find();
            return employees;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async singleEmployee(id){
        try {
            const this_employee = await this.employeeRepository.findById(id);
            return this_employee;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async employeeDelete(id){
        try {
            await this.employeeRepository.findByIdAndDelete(id);
            return null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async employeeUpdate(id,employee_data){
        try {
            const updated_employee = await this.employeeRepository.update(id,employee_data);
            return updated_employee;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async employeesExport(){
        try {
            // Fetch data from the database
            const employees = await this.employeeRepository.find({},true); // Using lean() for plain JavaScript objects
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
    
            return workbook;
        } catch (error) {
            throw new Error('Error generating Excel file: ' + error.message);
        }
    }
}

module.exports = new EmployeeServices(employeeRepository);