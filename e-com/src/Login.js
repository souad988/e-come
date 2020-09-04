import React ,{useState}from 'react';
import {Link , useHistory} from 'react-router-dom';
import './Login.css';
import { register } from './serviceWorker';
import { myauth } from "./firebase";

function Login() {

    const history=useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    //Sign in
    const login=event=>{
        event.preventDefault();//stop refreshing the page by default 
        myauth.signInWithEmailAndPassword(email,password).then((myauth)=>{
            history.push("/");
        }).catch((e)=>alert(e.message));
    };
    
    //Sign up
    const register=event=>{
        event.preventDefault();
        myauth.createUserWithEmailAndPassword(email,password).then((myauth)=>{
            history.push("/");
        }).catch(e=>alert(e.message));
    };
    return (
        <div className="login">
           <Link to="/">
               <img src="../e-com-logo.png" alt=""/>
           </Link>
           <div className="login__form">
               <h1>Sign-in </h1>
               <form>
                   <h5><strong>Email</strong></h5>
                   <input value={email} type="email" onChange={event=>setEmail(event.target.value)}></input>
                   <h5><strong>Password</strong></h5>
                   <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                   <button type="submit" onClick={login}> sign in </button>
                   <button type="submit" onClick={register}> sign in </button>
               </form>
           </div>
        </div>
    )
}

export default Login;
