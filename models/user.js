// Require mongoose
const mongoose = require('mongoose');
// Require Joi to validate user
const Joi = require('joi');

//----------------------------------------------------------
// Create post schema
const userSchema = new mongoose.Schema({
   username:{ type:String, required:true, minlength:3, maxlength:50},
   firstName: String,
    lastName: String,
    password: String,
});

// Create post model
const User = mongoose.model('User', userSchema);

//----------------------------------------------------------
// Validate user
function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        firstName: Joi.string().max(50).required(),
        lastName: Joi.string().max(50).required(),
        password: Joi.string().min(4).max(50).required(),
    });
    return schema.validate(user);
}

// Export post model
module.exports = {User, validateUser};

//-------------------...ooo000 End of file 000ooo...------------------------//