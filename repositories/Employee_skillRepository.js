const BaseRepository = require('./BaseRepository');
const employee_skill = require('../models/employee_skill');

class Employee_skillRepository extends BaseRepository {
    constructor() {
        super(employee_skill);
    }

    async insertBulk(elements = []){
        return employee_skill.insertMany(elements);
    }

    async deleteBulk(query = {}){
        return employee_skill.deleteMany(query);
    }

    async deleteSpecific(query = {}){
        return employee_skill.findOneAndDelete(query);
    }
}

module.exports = new Employee_skillRepository();