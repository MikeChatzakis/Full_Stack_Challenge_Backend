

const { delete_entries_when_employee_is_deleted,delete_entries_when_skill_is_deleted } = require('../controllers/employeeSkillController');

const delete_relations_employee = async (req, res, next) => {
    try {
        await delete_entries_when_employee_is_deleted(req, res);
        next();
    } catch (err) {
        res.status(500).json({ message: 'Error while cascading delete', error: err });
    }
};

const delete_relations_skill = async (req, res, next) => {
    try {
        await delete_entries_when_skill_is_deleted(req, res);
        next();
    } catch (err) {
        res.status(500).json({ message: 'Error while cascading delete', error: err });
    }
};


module.exports = {delete_relations_employee,delete_relations_skill};