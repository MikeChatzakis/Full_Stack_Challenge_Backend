const Admin=require('../models/admin');
const jwt=require('jsonwebtoken');

const jwtSecret=process.env.JWT_SECRET;
const maxAge=3*24*60*60;

//-------------------------HELPER FUNCTIONS--------------------------

//handle errors
const handle_errors = (err) =>{
    let errors = {email:'', password:''};

    //signup - duplicate email
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }

    //signup - validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }

    //login - incorrect email or password
    if(err.message.includes('Incorrect Email') || err.message.includes('Wrong Password')){
        errors.password = 'Email or password incorrect';
    }

    return errors;
}

//create Token for login
const createToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn: maxAge
    });
}

//------------------------------ROUTES-------------------------------

//-------------------------------------------------------------------

//collect input data from user and create a 'user' in our database with given data
const register_admin_post = async (req, res) =>{
    const {email, password} = req.body;
    try{
    const admin = await Admin.create({email: email, password: password});
    //const token = createToken(admin._id);
    //res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge*1000});
    res.status(201).json({admin: admin._id});

    }catch(err){
        const errors = handle_errors(err);
        res.status(400).json({errors});
    }
}
//-------------------------------------------------------------------
//collect input data from user and log in if a 'user' exists in our database with given credentials
const login_admin_post = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const admin = await Admin.login(email,password);
        const token = createToken(admin._id);
        //res.cookie('jwt', token, {httpOnly: false, maxAge:maxAge*1000});
        //res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge*1000, secure: process.env.NODE_ENV === 'production', sameSite: 'strict'});
        res.status(200).json({admin: admin._id, token});
    } catch (err) {
        const errors = handle_errors(err);
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