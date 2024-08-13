const express = require('express');
const { create_skill_post, all_skills_get, single_skill_get, skill_delete,skill_update_put} = require('../controllers/skillController');
const {delete_relations_skill} = require ('../middleware/trigger_after_delete');

const router = express.Router();

router.post('/addSkill', create_skill_post);
router.get('/Skills_list', all_skills_get);
router.get('/skill/:id', single_skill_get);
router.delete('/skill/:id',delete_relations_skill, skill_delete);
router.patch('/skill/:id', skill_update_put);

module.exports = router;