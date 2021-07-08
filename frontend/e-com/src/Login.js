import React ,{useState}from 'react';
import {Link , useHistory} from 'react-router-dom';
import './Login.css';
import { register } from './serviceWorker';
import { myauth } from "./firebase";
import axios from "axios";
import {useStateValue} from './StateProvider';
function Login() {
    const [showing,setShowing]=useState(false);
    
    const history=useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [password1,setPassword1] = useState('');
  
    const [{user},dispatch]=useStateValue();
    
    //Sign in
   /* const login=event=>{
        event.preventDefault();//stop refreshing the page by default 
        axios ({
            method:'post',
            url:`/payement/create?total=${totalToPay(basket)*100}`
        }) .then((myauth)=>{
            history.push("/");
        }).catch((e)=>alert(e.message));
    };*/
    const login = event => {
        const getClientSecret = async () => {
            //console.log('clientSecret ::',clientSecret);
            const response = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/token/obtain/`,
                data: { 'username': username, 'password': password }
            });
            console.log('clientSecret ::', response.data);
        }

        event.preventDefault();//stop refreshing the page by default 
        getClientSecret().then(() => {
            dispatch({
                type:'SET_USER',
                user:{'username': username, 'password': password }
            }) 
            history.push("/");
        }).catch((e) => alert("email or password incorrect!!"));
    };

    const register = event => {
        event.preventDefault();
        const getClientSecret = async () => {
            //console.log('clientSecret ::',clientSecret);
            const response = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/create/`,
                data: { 'username': username,'password': password, 'password1': password,'password2':password1, 'email': email }
            });
            console.log('register:', response.data);
        }
        getClientSecret().then(() => {
            history.push("/");
        }).catch((e) => alert(e.message));
    };
    
    /*Sign up
    const register=event=>{
        event.preventDefault();
        myauth.createUserWithEmailAndPassword(email,password).then((myauth)=>{
            history.push("/");
           
        }).catch(e=>alert(e.message));
    };*/


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
                   <h5><strong>username</strong></h5>
                   <input value={username} type="email" onChange={event=>setUsername(event.target.value)}></input>
                   <h5><strong>Password</strong></h5>
                   <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                   <button type="submit" onClick={login}> sign in </button>
                  
               </form>
                <a href="#" onClick={() => setShowing({ showing: !showing })}>Create a new account? </a>
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
