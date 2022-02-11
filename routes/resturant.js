
const router = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const res = require('express/lib/response');
const {mongo} = require('mongoose');

const Resturant = require('../models/Resturant');
const { route } = require('./auth');
const { isAuth } = require('../utils.js');

//Creating the resturant 
router.post('/resturants', async(req, res)=>{
    const resturant = new Resturant({
        name: req.body.name,
        address: req.body.address,
        foodMenu: req.body.foodMenu,
        image: req.body.image,
        rating: req.body.rating,
    })

    try{
        const savedResturant = await resturant.save();
        res.json(savedResturant);
    }catch(err){
        res.json({message: err})
    }
});

//getting all the resturants
router.get('/', async(req, res)=>{
    const name = req.query.name || '';
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {};
    const resturants = await Resturant.find({...nameFilter});
    res.send(resturants);
});

//Updating the resturant 
router.patch('/resturants/:id', async (req, res)=>{
    try{
        const updatedResturant = await Resturant.updateOne({_id: req.params.id}, 
            {
                $set : {
                    foodMenu: req.body.foodMenu
                }
            });
            res.json(updatedResturant);
        }catch(err) {
            res.json({message: err})
        }
})

//Delete the resturant
router.delete('/resturants/:id', async (req, res)=>{
    try{
        const removedResturant = await Resturant.remove({_id: req.params.id})
        res.json(removedResturant);
    }catch(err){
        res.json({message: err})
    }
});

//Getting single Resturant infos 
router.get('/resturant/:id', async(req, res)=>{
    try{
    const restu = await Resturant.findById(req.params.id);
    res.json(restu);
    }catch(err){
        res.json({message: err})
    }
})

//Searching returant by name 
router.get('/search?[name=name][&[area=area]]*', async(req, res)=>{
    
})

router.post(
    '/resturants/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res)=> {
        const resturantId = req.params.id;
        const resturant = await Resturant.findById(resturantId);
        if(resturant) {
            if(resturant.reviews.find((x) => x.name === req.user.email)) {
                return res.status(400).send({message: 'You already have a review.....'})
            }
            const review = {
                name: req.user.email,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            resturant.reviews.push(review);
            resturant.numReviews = resturant.reviews.length;
            resturant.rating = resturant.reviews.reduce((a, c)=> c.rating + a, 0) / resturant.reviews.length;

            const updatedResturant = await resturant.save();
            res.status(201).send({
                message: 'Review Created',
                review: updatedResturant.reviews[updatedResturant.reviews.length-1],
            });
        }else {
            res.status(404).send({message: 'Resturant was not found...'})
        }
    })

)

module.exports = router;