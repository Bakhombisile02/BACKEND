// Require Mongoose to create a model
const mongoose = require('mongoose');
// Require Joi to validate user
const Joi = require('joi');

// Create post schema
const boardSchema = new mongoose.Schema({
    title: String,
    description: String,
    departmentCode: String,
});

// Create post model   
const Board = mongoose.model('Board', boardSchema);

// Validate post
function validateBoard(board){
    const schema = Joi.object({
        title: Joi.string().max(50).required(),
        description: Joi.string().required(),
        departmentCode: Joi.string().min(1).max(20).required(),
    });
    return schema.validate(board);
}

// Export post model
module.exports = {Board, validateBoard};

//-------------------...ooo000 End of file 000ooo...------------------------//