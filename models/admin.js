const mongoose=require('mongoose');
const {isEmail, isStrongPassword, isMobilePhone, isAlpha}=require('validator');
const bcrypt= require('bcrypt');

const adminSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true,'Please enter a password'],
        validate: {
            validator: function(val){
                const options={
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                    returnScore: false,
                    pointsPerUnique: 1,
                    pointsPerRepeat: 0.5,
                    pointsForContainingLower: 10,
                    pointsForContainingUpper: 10,
                    pointsForContainingNumber: 10,
                    pointsForContainingSymbol: 10
                };
                return isStrongPassword(val, options);
            },
            message: `Password is not strong enough. It must include at least one uppercase letter(A-Z), one lowercase letter(a-z), one number(0-9) and one special character.`
        }
    }
});

//fire function before save to DB - hashes the password to make it more safe
adminSchema.pre('save', async function(next){
    if (!this.isModified('password'))
        return next();

    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

    next();
})

//check login - checkes if credentials match a user on the DB
adminSchema.statics.login = async function(email, password){
    const admin = await this.findOne({email: email});

    if(admin){
        const auth= await bcrypt.compare(password,admin.password);
        if(auth){
            return admin;
        }
        throw Error('Wrong Password');
    }
    throw Error('Incorrect Email');

}


const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;