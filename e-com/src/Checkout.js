import React from 'react';
import { useStateValue } from './StateProvider';
import ProductCheckout from './ProductCheckout';
import './Checkout.css';
import CheckoutTotal from './CheckoutTotal';
function Checkout() {
    const [{basket}]= useStateValue(); 
    const  x = 0;
    return (
        <div className="checkout__com">
          <div className="checkout__product"> 
          <div className="checkout__adv">
          <span >Ad</span>
          <div className="checkout__ad">
         
          <img src="../netflix.jpg"
          alt=""/>
          </div>
          </div>
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
         <div >
          
            <CheckoutTotal />
         </div>
        </div>
    )
}

export default Checkout;
