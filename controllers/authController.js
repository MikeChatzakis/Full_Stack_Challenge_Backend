const AuthServices = require('../services/AuthServices');

//------------------------------ROUTES-------------------------------

//-------------------------------------------------------------------

//collect input data from user and create a 'user' in our database with given data
const register_admin_post = async (req, res) =>{
    try{
    const admin = await AuthServices.registerAdmin(req.body);
    res.status(201).json({admin: admin._id});
    }catch(err){
        const errors = JSON.parse(err.message);
        res.status(400).json({errors});
    }
}
//-------------------------------------------------------------------
//collect input data from user and log in if a 'user' exists in our database with given credentials
const login_admin_post = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const result = await AuthServices.loginAdmin(email,password);
        res.status(200).json({admin:result.admin._id,token:result.token});
    } catch (err) {
        const errors = JSON.parse(err.message);
        res.status(400).json({errors});
    }
}

//-------------------------------------------------------------------
//logout means delete cookie --- it is handled by the frontend so this is not used
const logout_admin_post = (req, res) =>{
    try {
        res.clearCookie('jwt',{ path: '/', httpOnly: true});
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { register_admin_post, login_admin_post, logout_admin_post };