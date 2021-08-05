import React ,{useState,useEffect,useRef}from 'react';
import {Link , useHistory} from 'react-router-dom';
import './Login.css';
import axios from "axios";
import {useStateValue} from './StateProvider';
import { useForm } from "react-hook-form"
import Form_Input  from './Form_Input';
function Login() {
    const [dispatch]=useStateValue();
    const history=useHistory();
    const { register:register_login, handleSubmit:handleSubmit_login, watch:watch_login, formState: { errors:errors_login } } = useForm({mode:"onBlur"});


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
        }).catch((error) =>{ 
                            if(error.response){
                                console.log(error.response)
                            }
                            alert("email or password incorrect!!")});
    };
    
    return (
        <div className="login">
          
           <Link to="/">
               <img src="../e-com-logo.png" alt="" className="login_img"/>
           </Link>
           <div className="form__container">

         {/***************************************LOGIN USER FORM  ************************************************/}

           <div className="login__form">
               <h5>do you have an account?</h5>
               <h1>Sign-in </h1>
               <form onSubmit={handleSubmit_login(login)}>
                   <div className="login_form_input">
                   <h5><strong>username</strong></h5>
                   <div className="login_form_error">
                   <input  type="text" {...register_login("login_username",{required:'this field is required'})} />
                   {errors_login["login_username"]&&<p>{errors_login["login_username"].message}</p>}
                   </div></div>
                   <div className="login_form_input">
                   <h5><strong>Password</strong></h5>
                   <div className="login_form_error">
                   <input  type="password" {...register_login("login_password",{required:'this field is required'})}/>
                   {errors_login["login_username"]&&<p >{errors_login["login_username"].message}</p>}
                  </div> </div>
                  <button type="submit" > sign in </button>
                  
               </form>
                <a href="#" onClick={() => history.push('/login_register_form')}>Create a new account? </a>
           </div>
         
        
           </div>
        </div>
    )
}

export default Login;
