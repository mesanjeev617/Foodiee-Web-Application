const expressAsyncHandler = require('express-async-handler')
//Importing router with express
const router = require('express').Router();
//Import User
const User = require('../models/Users');
//Import bcrypt
const bcrypt = require('bcryptjs');
//Import @hapi/joi
const {invalid} = require('@hapi/joi')
//Import JWT
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const {generateToken} = require('../utils.js')
const { isAuth } = require('../utils.js');


router.post('/auth/register', expressAsyncHandler(async (req, res)=>{
    //{error} -- can retrieve object .....
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if email is registered...
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Sorry !!! Email already exist');

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        email: createdUser.email,
        token: generateToken(createdUser)
    })
}))

// router.post('/auth/register', async (req, res)=> {
//     //{error} -- can retrieve object .....
//     const {error} = registerValidation(req.body)
//     if(error) return res.status(400).send(error.details[0].message)

//     //checking if email is registered...
//     const emailExists = await User.findOne({email: req.body.email});
//     if(emailExists) return res.status(400).send('Sorry !!! Email already exist');

//     //Hashing and generating salt.....
//     //10 complexity of the string...
//     const salt = await bcrypt.genSalt(10);
//     //output is salt and hashed....
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = new User({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: hashedPassword
//     })

//     try {
//         const savedUser = await user.save();
//         res.send({user: user._id});
//     }catch(err){
//         res.status(400).send(err);
//     }
// });

//LOGIN...
router.post('/auth/signin', expressAsyncHandler(async (req, res)=>{
    //Validating the data before posting to the database....and make a user
    //{error} lekhyo vane yeslai retrive garna sakinxa muni
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the user is not in the database 
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({message: 'Invalid password'});

    //password is correct.....
    // const validPass = await bcrypt.compare(req.body.password, user.password);
    // if(!validPass) return res.status(400).send('Invalid Password....')

    //JWT
    //create and assign token
    //token secret is in dotenv...
    // const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    // res.header('auth-token', token).send(token);
    // res.send('Logged Innnnn......')
}));

//Getting specific user
router.get('/users/:id', async (req, res)=>{
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
          } else {
            res.status(404).send({ message: 'User Not Found' });
          }
});


//http://localhost:3000/order/${userId}/${resturantId}
router.post(
    '/order/:userId/:resturantId',
    isAuth,
    expressAsyncHandler(async (req, res)=> {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if(user) {
            // if(user.order) {
            //     return res.status(400).send({message: 'You already ordered.....'})
            // }
            const order = {
                order: req.body.order,
                resturantId: req.params.resturantId
            };
            user.orders.push(order);
            const updatedOrder = await user.save();
            res.status(201).send({
                message: 'Order Created',
                review: updatedOrder.orders,
            });
        }else {
            res.status(404).send({message: 'Resturant was not found...'})
        }
    })

)

module.exports = router;