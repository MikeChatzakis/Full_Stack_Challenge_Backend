const Employee = require('../models/employee');

//find() is what I want for late
// const this_skill = await Skill.findOne({_id: req.params.id});


//add 1 new employee
const create_employee_post = async (req,res) => {

    const {name, surname, phone,email} = req.body;

    try {
        const newEmployee = new Employee({name,surname,phone,email});
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
    const {name, surname, phone,email} = req.body;
    try {
        const updated_employee = await Employee.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            email: req.body.email
        });
        res.status(200).json(updated_employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { create_employee_post, all_employees_get, single_employee_get, employee_delete, employee_update_put};