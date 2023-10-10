// Desc: Sets the Strict-Transport-Security header
function hsts(req, res, next) {
    if(req.secure) {
        res.setHeader('Strict-Transport-Security',
         'max-age=31536000; includeSubDomains; preload'
         );
    }
    next();   
}

// Export the function
module.exports = hsts;

//-------------------...ooo000 End of file 000ooo...------------------------//