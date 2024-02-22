import React,{useState,useEffect} from 'react'
import "../style/login.css"
import {Link,useNavigate} from 'react-router-dom'

import {LoginSocialFacebook} from 'reactjs-social-login'
import {FacebookLoginButton} from 'react-social-login-buttons'

import axios from 'axios'
import Validation from './LoginValidation'
export default function Login_page() {
    const [value,setvalue]=useState({
        email: "",
        password: ""
    })
    // useEffect(() => {
    //     // Initialize Facebook 
    //     window.fbAsyncInit = function () {
    //         console.log("in")
    //         window.FB.init({
    //             appId: '1323950248267499',
    //             autoLogAppEvents: true,
    //             xfbml: true,
    //             version: 'v12.0'
    //         });
    //     };
    // }, []);
    // const handleFacebookLogin = () => {
    //     console.log("in")
    //     window.FB.login(function (response) {
    //         if (response.authResponse) {
    //             console.log('Facebook login successful!');
    //             window.FB.api('/me', { fields: 'name,email' }, function (fbResponse) {
    //                 const { email } = fbResponse;

    //                 const password = email;
                    
    //                 axios.post("http://localhost:8080/login", { email, password })
    //                     .then(res => {
    //                         if (res.data === "Success") {
    //                             navigate('/connect');
    //                             alert('User Login Successfully');
    //                         } else {
    //                             alert('Failed to store user data');
    //                         }
    //                     })
    //                     .catch(err => console.log(err));
    //             });
    //         } else {
    //             console.log('Facebook login failed!');
    //         }
    //     }, { scope: 'email' });
    // };
    const navigate=useNavigate()
    const [error,setError] =useState({})

    const handleSubmit=(event)=>{
        event.preventDefault();
        setError(Validation(value))

        if (Object.keys(error).length === 0){
            axios.post("http://localhost:8080/login",value).then(res => {
              
                if(res.data === "Success"){
                    navigate('/connect')
                    alert('User Login Successfully')
                }
                else{
                    alert('No Record Exist')

                }
               
                
            }).catch(err=>console.log(err));
            console.log("Not Checking");
        }

    }
    const handleInput=(event)=>{
        setvalue(prev => ({...value,[event.target.name]: event.target.value}))
        
    }
  return (
    <div>
         <div className='d-flex justify-content-center align-items-center bg-primary  vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <h2>Login In</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='email' id='label'><strong>Email</strong></label>
                        <input type="email" className="form-control rounded-0" id="email" onChange={handleInput} placeholder='Enter Email' name='email' />
                        {
                            error.email && <span className='text-danger'>{error.email}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' id='label'><strong>Password</strong></label>
                        <input type="password" className="form-control rounded-0" onChange={handleInput} id="password" placeholder='Enter Password' name="password" />
                        {
                            error.password && <span className='text-danger '>{error.password}</span>
                        }
                    </div>
                    <button type="submit"  className="btn btn-success w-100 rounded-full">Log In</button>
                    {/* <button onClick={handleFacebookLogin} className="btn btn-primary w-100 rounded-0 mt-3">Log In with Facebook</button> */}
                    <LoginSocialFacebook
                        appId="1323950248267499"
                        OnSuccess={(response)=>{
                            console.log(response)
                        }}
                        OnFail={(error)=>{
                            console.log(error)
                        }}>
                        <FacebookLoginButton >
                            
                        </FacebookLoginButton>
                    </LoginSocialFacebook>
                    <p className='m-3'>Don't have account</p>
                    <Link to="/register" className="btn btn-white w-100 rounded-0 text-primary ">Register</Link>
                   
                    
                </form>
            </div>
        </div>
    </div>
  )
}
