// Desc: Middleware to check if user is authenticated
const jwt = require('jsonwebtoken');

// function to check if user is authenticated
function auth(req, res, next){
    const token = req.header('x-auth-token');
    let id;

    //check if token is valid
    try{
        const{ userId }= jwt.verify(token, process.env.JWT_SECRET_KEY)
        id = userId;
    } catch(err){
        return res.sendStatus(401);
    }

    //check if user is authenticated
    if(id){
        req.user = {id};
        return next();
    }

    res.sendStatus(401);
}

// Export the function
module.exports = auth;

//-------------------...ooo000 End of file 000ooo...------------------------//