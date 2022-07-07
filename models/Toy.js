const mongoose = require('mongoose');


const toySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [ true ],
        ref:'Users'  
    },
    name: {
        type: String,
        required:[true,"Please give a name for the Toy"],
        unique: true,
        maxLength:[20,"Toy Name cannot be more than 20 chars"]
    },
    description: {
        type: String,
        required: [ true, "Description of the Toy is required !!!" ],
        maxLength:[100,"Description cannot be more than 100 chars"]
    },
    price: {
        type: Number,
        min:[1, "Least price is 1 $"]
    },
    ageRestriction: Number,
    createdAt: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Toys',toySchema);
