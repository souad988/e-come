import React,{useState,useEffect} from 'react';
import "./Payement.css";
import ProductCheckout from "./ProductCheckout";
import Checkout from "./Checkout";
import {totalToPay} from "./reducer";
import {useStateValue} from "./StateProvider";
import  {useHistory} from 'react-router-dom';
import axios from './axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {db} from './firebase';

function Payement() {
    const [{basket,user},dispatch]=useStateValue();
    const stripe=useStripe();
    const elements=useElements();
    const history = useHistory();
    const [succeded,setSucceded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState('');
     useEffect(() => {
         const getClientSecret = async ()=>{
            //console.log('clientSecret ::',clientSecret);
              const response = await axios ({
                  method:'post',
                  url:`/payement/create?total=${totalToPay(basket)*100}`
              }) ;
              
              setClientSecret(response.data.clientSecret);
              console.log('clientSecret ::',clientSecret);
         }
         getClientSecret();
        
     }, [basket])
     
    //console.log('le total est :',totalToPay(basket));
    const handleSubmit = async (event) =>{
             event.preventDefault();
             setProcessing(true);
             const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                   card:elements.getElement(CardElement)
               }  
             }).then(({paymentIntent})=>{
                 // paymentItent is payment confirmation 
                 console.log('here we are :',paymentIntent)
                db
                  .collection('clients')
                  .doc(user?.uid)
                  .collection('orders')
                  .doc(paymentIntent.id)
                  .set({
                      basket:basket,
                      amount:paymentIntent.amount,
                      created:paymentIntent.created
                    })
                
                 dispatch({
                    type:'CLEAR_BASKET',
                         }) 
                     
                
                 setProcessing(false);
                 setSucceded(true);
                 setError(null);

                 history.push('/Checkout')
             })
    }
    const handleChange = event =>{
           setDisabled(event.empty);
           setError(event.error? event.error.message : "");
    }
    return (
        <div className="payement">
            <div></div>
         <div className="payement__container">
             <div><h3> delivery adresse</h3>
             <p>azli sud 867°</p>
             <p>marrakech morroco</p>
             </div>
             <div className="payement__total">
                  <div className="payement__method">
                  <form onSubmit={handleSubmit}>
                     <CardElement onChange={handleChange}/> 
                     <h5>total to pay :</h5>
                   <p><small>$</small> <strong>{totalToPay(basket)}</strong></p> 
                   <button disabled={processing || succeded || disabled}>finish your command</button>
                 </form>
             </div>
             
             </div>
             <div className="payement__product">
             {basket?.length === 0 ?
         ( <div><h1>empty basket!!!!!!</h1></div>) :
         (<div><h1>your items : </h1>
            {basket.map(item =>(
               <ProductCheckout 
               id={item.id}
               title={item.title}
               price={item.price}
               img={item.img}
               range={item.range}
               />
            )
            )}
             </div>)
                }
                </div>
            
            </div>
        <div></div>
        </div>
    )
}

export default Payement;
