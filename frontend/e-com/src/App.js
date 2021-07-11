import React , {useEffect,useState} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from "./Header";
import Product_liste from "./Product_liste";
import Checkout from './Checkout';
import Login from './Login';
import {myauth} from "./firebase";
import { useStateValue } from './StateProvider';
import Payement from './Payement';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import  BootstrapCarousel from './BootstrapCarousel'
import Product_detail from './Product_detail'
import Animat from './Animat'
import Footer from './Footer'
import Vertical_nav from './Vertical_nav'
const promise =loadStripe(
"pk_test_51HQHhJFwMsEistgVHY3TeyJL5ziOmn0HDA1Akyx2JqQhXExGtwkFa5L4lGM4Z0lqpE6y4RJuArfRDvqKByhil8tP00KNqndR2C"
);

function App() {
  const [{user},dispatch]=useStateValue();
 
 
  useEffect(() => {

   const unsubscribe = myauth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser
        });

      }else{
        dispatch({
          type:'SET_USER',
          user:null
        });
      }
      });

      return ()=>{
        unsubscribe();
    };
    
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>

          <Route path="/login">
          <Header/>
            <Login/>
          </Route>

          <Route path="/checkout">
             <Header/>
             <Checkout/>
          </Route>

           <Route path="/product_detail">
            <Header/>
            <div className="app_home_container">
             <Vertical_nav/>
            <Product_detail/>
             
             </div>
             <Footer/>
            
           </Route>

          <Route path="/payement">
             <Header/>
             <Elements stripe={promise}>
                <Payement/>
             </Elements> 
          </Route>

          <Route path="/">
            <Header/>
             <Animat/>
             <div className="app_home_container">
             <Vertical_nav/>
             <Product_liste/>
             <div className="app_home_container_ads"> Ads</div>
             </div>
             <Footer/>
          </Route>

         

        </Switch>
      </Router>
   
    </div>
  );
}

export default App;
