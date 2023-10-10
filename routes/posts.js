// Initialize express router
const router = require('express').Router();
// Require auth middleware
const auth = require('../middleware/auth');
// Require board model in our routes module
const { Board, validateBoard } = require('../models/board');

//get all boards
router.get('/', auth, async(req,res)=>{
    const boards = await Board.find();
    res.send(boards);
});

//create new board
router.post('/', auth, async(req,res)=>{
    const {error} = validateBoard(req.body);
    if(error) return res.status(400).json(error.detail[0].message);

    const board = new Board(req.body);
    await board.save();
    res.send(board);
});


//get a single board
router.get('/:id', auth, async(req,res)=>{
    const board = await Board.findById(req.params.id);
    if(board) return res.send(board);
    res.status(404).send('The board with the given ID was not found');
});

//delete a single board
router.delete('/:id', auth, async(req,res)=>{
    const result = await Board.deleteOne({_id:req.params.id});
    res.send(result);
});

module.exports = router;// Export API routes

//----------------...ooo000 End of file 000ooo...------------------------