import React from 'react';
import { useStateValue } from './StateProvider';
import { totalToPay } from './reducer';
import './CheckoutTotal.css'
    
    
function CheckoutTotal() { 
  const [{basket}]=useStateValue();
    return (
       <div className="checkout__total">
        <h3>total to pay :</h3>
        <p><small>$</small> <strong>{totalToPay(basket)}</strong></p> 
         <button>finish your command</button>  
        </div>
    )
}

export default CheckoutTotal;
