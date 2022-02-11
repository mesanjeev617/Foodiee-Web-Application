const string = require('@hapi/joi/lib/types/string');
const mongoose = require('mongoose');
require('./Resturant')

const orderSchema = new mongoose.Schema(
    {
      order: [{type: String}],
      resturantId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Resturant'
     }
    },
    {
      timestamps: true,
    }
);

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min : 4
    },
    lastname: {
        type: String,
        required: true,
        min: 4
    },
    email : {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max : 1024,
        min: 6
    },
    orders: [orderSchema],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);