const mongoose = require('mongoose');

//Import resturants
require('../models/Resturant');
//import users
require('../models/Users');

const orderSchema = mongoose.Schema({
    resturant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [String],
    subtotal : Number,
    date: {
        type: Date,
        default: Date.now
    }
});

//Export
module.exports = mongoose.model('Order', orderSchema);