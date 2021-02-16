const functions = require('firebase-functions');
const express = require("express");
const cors=require("cors");
const { request, response } = require('express');
const stripe = require("stripe")('sk_test_51HQHhJFwMsEistgVxatD8OTfEiMUAKhlImXVvzWqdu8bXiWzWxgYXq0ALA6UwKOEqwSFYLzpFNvbSq6HJSADdZyn00rZHK0QUZ')


//Api 

// Api config 
const app = express();
//midlewares
app.use(cors({origin: true}));
app.use(express.json());
// Api routes
app.get('/',(request,response)=>response.status(200).send('hello souad'))
app.post('/payement/create',async(request,response)=>{
    const total = request.query.total;
    console.log('yyyyyyeeees the total is here ::',total);
   const paymentIntent =await stripe.paymentIntents.create({
       amount:total,
       currency:"usd",
   });
   console.log('client secret :::::',paymentIntent.client_secret);
   response.status(201).send({
     clientSecret : paymentIntent.client_secret,
 })
})
//listen command
exports.api = functions.https.onRequest(app);