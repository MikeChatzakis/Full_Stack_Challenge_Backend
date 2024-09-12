const AdminRepository = require('../repositories/AdminRepository');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const maxAge = 3*24*60*60;

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

//----------------------------------

//create Token for login
const createToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn: maxAge
    });
}
//-------------------------------------------------------------------

class AuthServices{
    constructor(authRepository){
        this.authRepository=authRepository;
    }

    async registerAdmin(admin_data){
        try{
        const admin = await this.authRepository.create(admin_data);
        return admin;
        }catch(err){
            const errors = handle_errors(err);
            throw new Error(JSON.stringify(errors));
        }
    }

    async loginAdmin (email,password){
        try {
            const admin = await this.authRepository.login(email,password);
            const token = createToken(admin._id);
            //res.cookie('jwt', token, {httpOnly: false, maxAge:maxAge*1000});
            //res.cookie('jwt', token, {httpOnly: true, maxAge:maxAge*1000, secure: process.env.NODE_ENV === 'production', sameSite: 'strict'});
            return {admin,token};
        } catch (err) {
            const errors = handle_errors(err);
            throw new Error(JSON.stringify(errors));
        }
    }
}

module.exports = new AuthServices(AdminRepository);