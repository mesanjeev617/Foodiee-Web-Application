const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
);

const resturantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,

    },
    foodMenu: [String],
    numReviews: {type: Number, required: true},
    reviews: [reviewSchema],
},
{
    timestamps: true,
});

module.exports = mongoose.model('Resturant', resturantSchema);