
const asyncHandler = require('../middlewares/async');
const Users = require('../models/User');
const Toys = require('../models/Toy');


// @description :   Get all Toys for this user
// @route       :   GET/api/v1/toys
// @access      :   Private
exports.getToys = asyncHandler(async (req, res) => {
    console.log(req.query);
    if (req.query) {
        const reQuery = { ...req.query };
        reQuery.user = req.user.id;
        const query = await Toys.find(reQuery);
        if (!query) {
            throw new Error('No Toys are in The DB according to Search')
        }
        res.status(200).json({ success: true, data: query });
    } else {
        const toys = await Toys.find({ user: req.user.id });
        if (!toys) {
            throw new Error('No Toys are in The DB')
        }
        res.status(200).json({ success: true, data: toys });
    }
    
    
})

// @description :   Create a new Toy for this user
// @route       :   POST/api/v1/toys
// @access      :   Private
exports.createToy = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new Error('Please Enter All the fields ')
    }
    const user = await Users.findById(req.user.id);
    console.log(user, req.user.id);
    if (!user) {
        throw new Error('Invalid Authorization')
    }
    const toys = await Toys.create({
        ...req.body,
        user: req.user.id,
    });
    if (!toys) {
        throw new Error('Failed to insert Toy Make sure u enter all fields')
    }
    res.json({ success: true, data: toys });
})

// @description :   Update a Toy for this user
// @route       :   UPDATE/api/v1/toys
// @access      :   Private
exports.updateToy = asyncHandler(async (req, res) => {
    console.log(req.headers.id);
    if (!req.headers.id) {
        throw new Error('Please give the id ')
    }
    const note = await Toys.findById(req.headers.id);
    const user = await Users.findById(req.user.id);
    if (!user) {
        throw new Error('Invalid Authorization')
    }
    if (note.user.toString() !== user.id) {
        throw new Error('User Not  Authorization')
    }
    const toys = await Toys.findByIdAndUpdate(req.headers.id, {
        ...req.body,
        user: req.user.id,
    }, {
        new: true,
        runValidators: true
    })
    if (!toys) {
        throw new Error('Failed to Update Toy Make sure u enter all fields')
    }
    res.json({ success: true, data: toys });
})

// @description :   Delete a Toy for this user
// @route       :   DELETE/api/v1/toys
// @access      :   Private
exports.deleteToy = asyncHandler(async (req, res) => {
    if (!req.headers.id) {
        throw new Error('Please give the id ')
    }
    const user = await Users.findById(req.user.id);
    if (!user) {
        throw new Error('Invalid Authorization')
    }
    const toys = await Toys.findByIdAndDelete(req.headers.id);
    if (!toys) {
        throw new Error('Failed to Delete Toy Make sure u enter all fields')
    }
    res.json({ success: true, data: toys });
})
