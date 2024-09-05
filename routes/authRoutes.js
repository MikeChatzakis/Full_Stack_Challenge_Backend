const { Router } =require('express');
const { register_admin_post, login_admin_post, logout_admin_post } = require('../controllers/authController');

const router=Router();

router.post('/signup', register_admin_post);
router.post('/login', login_admin_post);
router.get('/logout', logout_admin_post); // logout(delete cookies) handled by the frontend so this is not needed.

module.exports=router;