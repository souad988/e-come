import React ,{useState,useEffect,useRef}from 'react';
import {Link , useHistory} from 'react-router-dom';
import './Login.css';
import axios from "axios";
import {useStateValue} from './StateProvider';
import { useForm } from "react-hook-form"
import Form_Input  from './Form_Input';
function Login() {
    const [showing,setShowing]=useState(0);
      const { register, handleSubmit, watch, formState: { errors } } = useForm({mode:"onBlur"});
    const history=useHistory();
    const email=watch("email", "");;
    const password=watch("password", "");
    const username=watch("username", "");
    const password1=watch("password1", "");;
    const [error_message,setError_message]=useState({'email':'','username':'','password':'','password1':''})
    const [show_error_message,setShow_error_message]=useState({'email':false,'username':false,'password':false,'password1':false})
    const [{user},dispatch]=useStateValue();
    
    const input_form=[
        {
            label:'username',type:'text',validate:value=>true,required:'this field is required',pattern:{},minlenght:{value:6,message:'username should be 8 caracters at least '}
        },
        {
            label:'email',type:'email',validate:value=>true,required:'this field is required',pattern:{value:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,message:'this is not a valide email'},minlenght:{}
        },
        {
            label:'password',type:'password',validate:value=>true,required:'this field is required',pattern:{value:/^[0-9a-zA-Z]+$/,message:'password should have at least one uppercase one lowercase and a numbre'},minlenght:{value:8,message:'password should be 8 caracters at least'}
        },
        {
            label:'password1',type:'password',required:'this field is required',validate:value=>value==password||'the tow passwods do not match' ,pattern:{},minlenght:{}
        }

    ]
     
    

    const login = (event,data) => {
        console.log("from login ",data)
        
        const getJwt = async () => {
            //console.log('clientSecret ::',clientSecret);
            const response = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/token/obtain/`,
                data: { 'username': data.login_username, 'password': data.login_password}
            });
            console.log('clientSecret ::', response.data);
        }
        getJwt().then(() => {
            dispatch({
                type:'SET_USER',
                user:{'username': data.login_username, 'password': data.login_password }
            }) 
            history.push("/");
        }).catch((e) => alert("email or password incorrect!!"));
    };
  
    const register_user = (event,data) => {
        console.log("from register_user",username)
       
        const create_user = async () => {
            const response = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/users/create/`,
                data: { 'username': username,'password':password,'password1':password1,'password2':password1, 'email':email }
            }).then((res) => {
                   
                    setShowing(2)
                    console.log('then...',res)
                    setError_message(prev=>({...prev,email:res.data.user}))
                   
            }).catch( (error)=> {
                if (error.response) {
                   //server responded to the request
                    if(error.response.status==400){
                            console.log(error.response.data)
                            for (const [key,value] of Object.entries(error.response.data.errors)){
                                //destruct the object into liste to set the error state
                                    console.log(key)
                                    setError_message(prev=>({...prev,[key]:value}))
                                    setShow_error_message(prev=>({...prev,[key]:true}))
                                    console.log(error_message)
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
    
    return (
        <div className="login">
          
           <Link to="/">
               <img src="../e-com-logo.png" alt="" className="login_img"/>
           </Link>
           <div className="form__container">

         {/***************************************LOGIN USER FORM  ************************************************/}

           <div className="login__form" style={{ display: (showing===0 ?  'block' :'none') }}>
               <h5>do you have an account?</h5>
               <h1>Sign-in </h1>
               <form onSubmit={handleSubmit(login)}>
                   <div className="register_form_input">
                   <h5><strong>username</strong></h5>
                   <input  type="text" {...register("login_username",{required:'this field is required'})} />
                   {errors["login_username"]&&<p>{errors["login_username"].message}</p>}
                   </div>
                   <div className="register_form_input">
                   <h5><strong>Password</strong></h5>
                   <input  type="password" {...register("login_password",{required:'this field is required'})}/>
                   {errors["login_username"]&&<p >{errors["login_username"].message}</p>}
                  </div> 
                  <button type="submit" > sign in </button>
                  
               </form>
                <a href="#" onClick={() => setShowing(1)}>Create a new account? </a>
           </div>
         
         {/***************************************REGISTER USER FORM  ***********************************************/}

           <div className="signup__form" style={{ display: (showing===1 ? 'block' : 'none') }}>
               <h5>New user?</h5>
               <h1> Sign-up </h1>
               <form onSubmit={handleSubmit(register_user)}>
                   <div className="login_div_form">


                   {input_form.map(element=>(                                                     
                   <div className="register_form_input"> 
                     <h5> <strong>{element.label}</strong></h5>
                     <div className="register_form_error"> 
                    <input name={element.label} type={element.type} {...register(element.label,
                                                             { required: element.required,
                                                               pattern:element.pattern,
                                                               minLength:element.minlenght,
                                                               validate:element.validate
                                                             })}/> 
                                                         
                    {errors[element.label] && <p className="errorMsg">{errors[element.label].message}</p>}
                   
                     
                    
                    <p style={{display:(show_error_message[element.label]?'block':'none')}}> {error_message[element.label]?error_message[element.label][0]:''}</p>
                   </div>
                   </div>   
                   ))}
               
    
    </div>
                   <button type="submit"> <p>Register </p></button>  
               </form>
           </div>
           <div className="verify_email" style={{ display: (showing===2 ? 'block' : 'none') }}>
               <h5><strong>we sent an activating link to {error_message.email} email account in order to verify your email  </strong>
                   <strong>please click on that link and comme back to sign in </strong>
                   <a href="#" onClick={() => setShowing(0)}>sign in  </a>
               </h5>
           </div>
           </div>
        </div>
    )
}

export default Login;
