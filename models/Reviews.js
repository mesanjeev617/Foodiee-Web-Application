const mongoose = require('mongoose');
const { stringify } = require('querystring');
//Import resturant
require('../models/Resturant')
//Import users
require('../models/Users')

const reviewSchema = mongoose.Schema({
    resturant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    user_id: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        max: 500,
        min: 5
    },
    rating: {
        type: Number
    }
})

module.exports = mongoose.model('Review', reviewSchema);