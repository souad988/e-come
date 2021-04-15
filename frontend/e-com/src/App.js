import React , {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import Login from './Login';
import {myauth} from "./firebase";
import { useStateValue } from './StateProvider';
import Payement from './Payement';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

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
          <Route path="/payement">
             <Header/>
             <Elements stripe={promise}>
                <Payement/>
             </Elements>
            
          </Route>
          <Route path="/">
            <Header/>
              <Home/>

          </Route>

        </Switch>
      </Router>
   
    </div>
  );
}

export default App;
