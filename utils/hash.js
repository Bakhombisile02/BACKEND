// Desc: hash password
const bcrypt = require('bcrypt')

//-----------------------------------------------------
//hash password
async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

//-----------------------------------------------------
//compare password
async function isValidPassword(password, hash){
    return await bcrypt.compare(password, hash);
}

module.exports = { hashPassword, isValidPassword };

//-------------------...ooo000 End of file 000ooo...------------------------//