import React from 'react';
import { useStateValue } from './StateProvider';
import { totalToPay } from './reducer';
import './CheckoutTotal.css'
import {useHistory} from 'react-router-dom';
    
    
function CheckoutTotal() { 
  const history = useHistory();
    const [{ basket,user}]=useStateValue();
    return (
       <div className="checkout__total">
        <h3>total to pay :</h3>
        <p><small>$</small> <strong>{totalToPay(basket)}</strong></p> 
            <button onClick={e => { user ? history.push("/payement") : history.push("/login")}}>finish your command</button>
        </div>
    )
}

export default CheckoutTotal;
