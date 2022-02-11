const router = require('express').Router();
const Order = require('../models/Orders')

//create new order
router.post('/resturants/:resturantId/orders/:userId', async (req, res)=>{
    const order = new Order({
        resturant_id :req.params.resturantId,
        user_id : req.params.userId,
        items: req.body.items,
        subtotal: req.body.subtotal
    })

    try{
        const savedOrder = await order.save();
        res.json(savedOrder);

    }catch(err){
        res.json({message: err});
    }
});

//list all the order of resturant
router.get('/resturants/:id/orders', async (req, res)=>{
    try{
        const orders = await Order.find({resturant_id: req.params.id});
        res.json(orders);
        }catch(err){
            res.json({message: err})
        }
});+

//list oder of the specific user....
router.get('/user/:id/order', async(req, res)=>{
    try{
        const userOrder = await Order.find({user_id: req.params.id});
        res.json(userOrder);

    }catch(err){
        res.json({message : err})
    }
});

module.exports = router;