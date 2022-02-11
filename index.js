//Importing express
const express = require('express');
//Invoke express 
const app = express();
const cors = require('cors');
//Importing mongoose 
const mongoose = require('mongoose');
//Importing dotenv
const dotenv = require('dotenv');
//Importing routes 
const authRoute = require('./routes/auth')
const restRoute = require('./routes/resturant')
const orderRoute = require('./routes/order')
const reviewRoute = require('./routes/review')


dotenv.config();

//connecting to the database 
 mongoose.connect(process.env.DB_CONNECT|| 'mongodb://localhost/foodiee', {useNewUrlParser: true},  () =>{
     console.log('Congratulations Database is Connected !!!!!!!!!!!!!!')
});

//Middlewares 
app.use(express.json());
app.use(cors())
app.use('/', authRoute)
app.use('/', restRoute)
app.use('/', orderRoute)
app.use('/', reviewRoute)
//Listening to port 
app.listen(3000, ()=> {
    console.log('Server is Upp and Running !!!!')
});

