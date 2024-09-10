const express = require('express');
const { create_skill_post, all_skills_get, single_skill_get, skill_delete,skill_update_put,export_skills_to_excel_get} = require('../controllers/skillController');
const {delete_relations_skill} = require ('../middleware/trigger_after_delete');

const router = express.Router();

router.get('/skills/export', export_skills_to_excel_get);
router.get('/skills/:id', single_skill_get);
router.delete('/skills/:id',delete_relations_skill, skill_delete);
router.patch('/skills/:id', skill_update_put);
router.get('/skills', all_skills_get);
router.post('/skills', create_skill_post);


module.exports = router;