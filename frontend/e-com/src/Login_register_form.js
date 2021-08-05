import React ,{useState}from 'react'
import {useForm}from 'react-hook-form'
import { Link,useHistory } from 'react-router-dom';
import axios from "axios";
import './Login.css'
function Login_register_form(props) {
    const [showing,setShowing]=useState(1);
    const { register:register_register, handleSubmit:handleSubmit_register, watch:watch_register, formState: { errors:errors_register } } = useForm({mode:"onBlur"});
    //   const { register:register_login, handleSubmit:handleSubmit_login, watch:watch_login, formState: { errors:errors_login } } = useForm({mode:"onBlur"});
    //const { register1, handleSubmit, watch, formState: { errors1 } } = useForm({mode:"onBlur"});
    const history=useHistory();
    const email=watch_register("email", "");;
    const password=watch_register("password", "");
    const username=watch_register("username", "");
    const password1=watch_register("password1", "");;
    const [error_message,setError_message]=useState({'email':'','username':'','password':'','password1':''})
    const [show_error_message,setShow_error_message]=useState({'email':false,'username':false,'password':false,'password1':false})
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
    const register_user = (event,data) => {
        console.log("from register_user",data.username)
       
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

               
           <div className="signup__form" style={{ display: (showing===1 ? 'block' : 'none') }}>
               <h5>New user?</h5>
               <h1> Sign-up </h1>
               <form onSubmit={handleSubmit_register(register_user)}>
                   <div className="login_div_form">


                   {input_form.map(element=>(                                                     
                   <div className="register_form_input"> 
                     <h5> <strong>{element.label}</strong></h5>
                     <div className="register_form_error"> 
                    <input name={element.label} type={element.type} {...register_register(element.label,
                                                             { required: element.required,
                                                               pattern:element.pattern,
                                                               minLength:element.minlenght,
                                                               validate:element.validate
                                                             })}/> 
                                                         
                    {errors_register[element.label] && <p className="errorMsg">{errors_register[element.label].message}</p>}
                   
                     
                    
                    <p style={{display:(show_error_message[element.label]?'block':'none')}}> {error_message[element.label]?error_message[element.label][0]:''}</p>
                   </div>
                   </div>   
                   ))}
               
    
    </div>
                   <button type="submit"> <p>Register </p></button> 
                   <a href="#" onClick={() => history.push('login')}>  sign in  </a> 
               </form>
           </div>
           <div className="verify_email" style={{ display: (showing===2 ? 'block' : 'none') }}>
               <h5><strong>we sent an activating link to {error_message.email} email account in order to verify your email  </strong>
                   <strong>please click on that link and comme back to sign in </strong>
                   <a href="#" onClick={() => setShowing(0)}> sign in  </a>
               </h5>
           </div>
            </div>
        </div>
    )
}

export default Login_register_form


