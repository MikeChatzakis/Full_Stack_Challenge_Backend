const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const jwtSecret=process.env.JWT_SECRET;

const requireAuth = (req,res,next) =>{
    const token = req.cookies._auth;
    if(!token){
        return res.status(401).json({ message: 'Not authorized, please log in', redirect: true });
    }
    
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid', redirect: true });
    }
}


//check current Admin
const checkAdmin = (req, res, next) => {
    const token = req.cookies._auth;
    res.locals.cur_admin = null;

    if(token){
        jwt.verify(token,jwtSecret, async (err,decodedToken) => {
            if(err){
                console.log(err.message);
                next();
            } else {
                let admin = await Admin.findById(decodedToken.id);
                res.locals.cur_admin = admin;
                next();
            }
        });
    }
    else{
        next();
    }
}

module.exports={requireAuth, checkAdmin};