const BaseRepository = require('./BaseRepository');
const admin = require('../models/admin');

class AdminRepository extends BaseRepository {
    constructor() {
        super(admin);
    }

    async login(email,password){
        return admin.login(email,password);
    }
}

module.exports = new AdminRepository();