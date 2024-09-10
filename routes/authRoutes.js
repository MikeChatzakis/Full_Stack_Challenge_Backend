const { Router } =require('express');
const { register_admin_post, login_admin_post, logout_admin_post } = require('../controllers/authController');

const router=Router();

router.get('/admins/logout', logout_admin_post); // logout(delete cookies) handled by the frontend so this is not used at the moment.
router.post('/admins/signup', register_admin_post);
router.post('/admins/login', login_admin_post);

module.exports=router;