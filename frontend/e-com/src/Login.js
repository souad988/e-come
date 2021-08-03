import React ,{useState,useEffect}from 'react';
import {Link , useHistory} from 'react-router-dom';
import './Login.css';
import axios from "axios";
import {useStateValue} from './StateProvider';
function Login() {
    const [showing,setShowing]=useState(0);
    
    const history=useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [password1,setPassword1] = useState('');
    const [error_message,setError_message]=useState({'email':'','username':'','password':'','password1':''})
    const [show_error_message,setShow_error_message]=useState({'email':false,'username':false,'password':false,'password1':false})
    const [{user},dispatch]=useStateValue();
    

    
    const login = event => {
        event.preventDefault();//stop refreshing the page by default
        const getJwt = async () => {
            //console.log('clientSecret ::',clientSecret);
            const response = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/token/obtain/`,
                data: { 'username': username, 'password': password }
            });
            console.log('clientSecret ::', response.data);
        }
        getJwt().then(() => {
            dispatch({
                type:'SET_USER',
                user:{'username': username, 'password': password }
            }) 
            history.push("/");
        }).catch((e) => alert("email or password incorrect!!"));
    };
    
    const register = (event) => {
          //event.preventDefault();
        const create_user = async () => {
            const response = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/create/`,
                data: { 'username': username,'password': password,'password1':password1, 'email': email }
            }).then((res) => {
                    if(res.status===200){setShowing(2)
                    console.log('then...',res)
                    setError_message(prev=>({...prev,email:res.data.user}))
                    }else{
                        console.log('else of then ::',res.status,res.data)
                    }
                    
            }).catch( (error)=> {
                if (error.response) {
                   //server responded to the request
                    if(error.response.status==400){
                            for (const [key,value] of Object.entries(error.response.data.errors)){
                                //destruct the object into liste to set the error state
                                
                                    setError_message(prev=>({...prev,[key]:value}))
                                    setShow_error_message(prev=>({...prev,[key]:true}))
                                
                            }
                     
                    }else {
                        if(error.response.status==500){
                            alert('server doesn'+'t responde try again' )
                          } 
                      }
      
                } else if (error.request) {
                            // The request was made but no response was received
                            console.log(error.request);
                       } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                
              })
             
        }
        create_user()//call the async function
    }
    
   const check_validity =()=>{
     if(password.length>8 && password==password1 && email.length>4 && username.length>0){register()}
     else if (password1.length<8){
         setError_message(prev=>({...prev,[password1]:["password should contain more than 8 caracters "]}))
     }
      
   }
   
    return (
        <div className="login">
          
           <Link to="/">
               <img src="../e-com-logo.png" alt="" className="login_img"/>
           </Link>
           <div className="form__container">
           <div className="login__form" style={{ display: (showing===0 ?  'block' :'none') }}>
               <h5>do you have an account?</h5>
               <h1>Sign-in </h1>
               <form>
                   <div>
                   <h5><strong>username</strong></h5>
                   <input value={username} type="email" onChange={event=>setUsername(event.target.value)}></input>
                   </div>
                   <div>
                   <h5><strong>Password</strong></h5>
                   <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                  </div> 
                  <button type="submit" onClick={login}> sign in </button>
                  
               </form>
                <a href="#" onClick={() => setShowing(1)}>Create a new account? </a>
           </div>
           <div className="signup__form" style={{ display: (showing===1 ? 'block' : 'none') }}>
               <h5>New user?</h5>
               <h1> Sign-up </h1>
               <form>
                   <div className="login_div_form">
                   <div>
                    <h5><strong>User name</strong></h5>
                    <div className="register_form_error">
                   <input value={username} type="text" onChange={event=>setUsername(event.target.value)}></input>
                  <p style={{display:(show_error_message.username?'block':'none')}}> {error_message.username[0]}</p> 
                  </div></div>
                    
                   <div>
                    
                   <h5><strong>Email</strong></h5>
                   <div className="register_form_error"><input value={email} type="email" onChange={event=>setEmail(event.target.value)}></input>
                   <p style={{display:(show_error_message.email?'block':'none')}}> {error_message.email[0]}</p> </div></div>
                  
                   <div>
                   
                   <h5><strong>Password</strong></h5>
                  <div className="register_form_error"> <input value={password} type="password" onChange={event=>setPassword(event.target.value)}></input>
                   
                    <p style={{display:(show_error_message.password?'block':'none')}}> {error_message.password[0]} </p>
                   </div></div>
                   
                  
                  <div> 
                     <h5> <strong>Confirm Password</strong></h5>
                  <div className="register_form_error"> <input value={password1} type="password" onChange={event=>setPassword1(event.target.value)}></input>
                    <p style={{display:(show_error_message.password1?'block':'none')}}> {error_message.password1[0]}</p></div>
                   </div></div>
                   <button type="submit" onClick={check_validity}> <p>Register </p></button>
                   
               </form>
           </div>
           <div className="verify_email" style={{ display: (showing===2 ? 'block' : 'none') }}>
               <h5><strong>we sent an activating link to your email account in order to verify your email  </strong>
                   <strong>please click on that link and comme back to sign in </strong>
                   <a href="#" onClick={() => setShowing(0)}>sign in  </a>
               </h5>
           </div>
           </div>
        </div>
    )
}

export default Login;
