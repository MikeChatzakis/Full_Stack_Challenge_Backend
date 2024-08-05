const express = require('express');
const { createSkill_post, getAllSkills_get } = require('../controllers/skillController');

const router = express.Router();

router.post('/addSkill', createSkill_post);
router.get('/Skills_list', getAllSkills_get);

module.exports = router;