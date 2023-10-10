// Desc: User routes
const router = require('express').Router();
const {User, validateUser} = require('../models/user');
const {hashPassword} = require('../utils/hash');
const auth = require('../middleware/auth');
const rateLimit = require("express-rate-limit");

//-------------------------------------------------------------
// Create a rate limiter object
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

//-------------------------------------------------------------
//create user account with rate limiting
router.post('/', limiter, async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).json(error.detail[0].message);

    //check if username is unique
    const isUnique = (await User.count({username:req.body.username}))=== 0;//might be a problem
    if(!isUnique)
    return res
    .status(400)
    .json({error: 'Username already exists.'});

try{
    const user = new User(req.body);
    user.password = await hashPassword(user.password);
    await user.save();
}catch(err){
    return res.status(500).json(err);
}
res.sendStatus(201);
});

//-------------------------------------------------------------
//get current user with rate limiting
router.get('/', limiter, auth, async(req,res)=>{
res.send({currentUser: req.user});
});

module.exports = router; // Export API routes

//----------------...ooo000 End of file 000ooo...------------------------