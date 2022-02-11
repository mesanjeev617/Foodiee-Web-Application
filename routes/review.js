const router = require('express').Router();
const Review = require('../models/Reviews');
const { route } = require('./order');

//Create new review for the resturant....
router.post('/resturant/:restId/review/:userId', async(req, res)=>{
    const review = new Review({
        resturant_id: req.params.restId,
        user_id: req.params.userId,
        comment: req.body.comment,
        rating: req.body.rating
    })

    try{
        const savedReview = await review.save();
        res.json(savedReview);
    }catch(err){
        res.json({message: err})
    }
})

//review by specific user
router.get('/user/:id/reviews', async(req, res)=>{
    try{
        const userReview = await Review.find({user_id: req.params.id});
        res.json(userReview);
    }catch(err){
        res.json({message : err})
    }
})

//review to a specific resturant...
router.get('/resturant/:id/review', async (req, res)=>{
    try{
        const restReviews = await Review.find({resturant_id: req.params.id})
        res.json(restReviews);
    }catch(err){
        res.json({message : err})
    }
})

//delete the specific review 
router.delete('resturant/:restId/review/:reviewId', async (req, res)=>{
    
    try{
        const removedReview = await Review.remove({_id : req.params.reviewId})
        res.json(removedReview)
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router;