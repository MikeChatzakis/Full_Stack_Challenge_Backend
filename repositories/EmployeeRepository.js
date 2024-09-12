const BaseRepository = require('./BaseRepository');
const employee = require('../models/employee');

class EmployeeRepository extends BaseRepository {
    constructor() {
        super(employee);
    }
}

module.exports = new EmployeeRepository();