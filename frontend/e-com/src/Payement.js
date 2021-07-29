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

 /*
         const getCsrfToken = () => {
             const csrf = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
             return csrf ? csrf.pop() : '';
         };
                //  headers: {
               //          "X-CSRFToken": getCsrfToken()
               //          },
      */


    useEffect(() => {
     
         const getClientSecret = async ()=>{
            
             const response = await axios({
                 method: 'post',
                 url: `http://127.0.0.1:8000/order/payment/create1/`,
                 data: {'amount':totalToPay(basket)},
               
              }) ;
              setClientSecret(response.data.intent);
              console.log('clientSecret :', response.data.intent );
         }
         getClientSecret();
        
     }, [basket])
     
    
    const handleSubmit = async (event) =>{
             event.preventDefault();
             setProcessing(true);
             const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                   card:elements.getElement(CardElement)
               }  
             }).then((res)=>{
                 // res is payment confirmation 
                 if (res.error) {
                     console.log('error :', res.error)
                 }
                 else {
                 console.log('here we are :',res.paymentIntent)
               /* db
                  .collection('clients')
                  .doc(user?.uid)
                  .collection('orders')
                  .doc(paymentIntent.id)
                  .set({
                      basket:basket,
                      amount:paymentIntent.amount,
                      created:paymentIntent.created
                    })*/
                 dispatch({
                    type:'CLEAR_BASKET',
                         }) 
                 setProcessing(false);
                 setSucceded(true);
                 setError(null);
                 history.push('/Checkout')}
             })
        console.log('response:::', payload)
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
                     <h5>{error}</h5> 
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
