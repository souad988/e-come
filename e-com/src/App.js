import React , {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import Login from './Login';
import {myauth} from "./firebase";
import { useStateValue } from './StateProvider';


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
  console.log('user is :',user);
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
