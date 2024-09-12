const BaseRepository = require('./BaseRepository');
const Skill = require('../models/skill');

class SkillRepository extends BaseRepository {
    constructor() {
        super(Skill);
    }
}

module.exports = new SkillRepository();