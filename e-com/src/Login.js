import React ,{useState}from 'react';
import {Link , useHistory} from 'react-router-dom';
import './Login.css';
import { register } from './serviceWorker';
import { myauth } from "./firebase";

function Login() {
    const [showing,setShowing]=useState(false);
    
    const history=useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [password1,setPassword1] = useState('');
  
    
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
           <div className="form__container">
           <div className="login__form" style={{ display: (showing ? 'none'  :'block') }}>
               <h5>you have an account?</h5>
               <h1>Sign-in </h1>
               <form>
                   <h5><strong>Email</strong></h5>
                   <input value={email} type="email" onChange={event=>setEmail(event.target.value)}></input>
                   <h5><strong>Password</strong></h5>
                   <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                   <button type="submit" onClick={login}> sign in </button>
                  
               </form>
                <a href="javascript:;" onClick={() => setShowing({ showing: !showing })}>Create a new account? </a>
           </div>
           <div className="signup__form" style={{ display: (showing ? 'block' : 'none') }}>
               <h5>New user?</h5>
               <h1> Sign-up </h1>
               <form>
                  
                   <h5><strong>User name</strong></h5>
                   <input value={username} type="text" onChange={event=>setUsername(event.target.value)}></input>
                   <h5><strong>Email</strong></h5>
                   <input value={email} type="email" onChange={event=>setEmail(event.target.value)}></input>
                   <h5><strong>Password</strong></h5>
                   <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                   <h5><strong>Confirm Password</strong></h5>
                   <input value={password1} type="password" onChange={event=>setPassword1(event.target.value)}></input>
                   <button type="submit" onClick={register}> Register </button>
               </form>
           </div>
           </div>
        </div>
    )
}

export default Login;
