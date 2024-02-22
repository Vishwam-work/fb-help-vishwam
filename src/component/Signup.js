import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import axios from 'axios'

import Validation from './SignupValidation'
export default function () {
    const [value,setvalue]=useState({
        name:"",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const [error,setError] =useState({})

    const handleSubmit=(event)=>{
        event.preventDefault();
        setError(Validation(value))
        console.log("Error->",error)
        if (Object.keys(error).length === 0){
            axios.post("http://localhost:8080/register",value).then(res => {
                alert('User Registered Successfully')
                navigate('/')
                console.log(res)
                
            }).catch(err=>console.log(err));
            console.log("Form is submitted");
        }
    
}

    const handleInput=(event)=>{
        setvalue(prev => ({...value,[event.target.name]: event.target.value}))
        
    }

  return (
    <div>
        <div className='d-flex justify-content-center align-items-center bg-primary  vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Sign Up</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='text' id='label'><strong>Name</strong></label>
                    <input type="text" className="form-control rounded-0" id="text" placeholder='Enter Name' onChange={handleInput} name='name' />
                    {
                            error.name && <span className='text-danger'>{error.name}</span>
                    }
                </div>
                <div className="mb-3">
                        <label htmlFor='email' id='label'><strong>Email</strong></label>
                        <input type="email" className="form-control rounded-0" id="email" placeholder='Enter Email' onChange={handleInput} name='email' />
                        {
                            error.email && <span className='text-danger'>{error.email}</span>
                        }
                </div>
                <div className="mb-3">
                    <label htmlFor='password' id='label'><strong>Password</strong></label>
                    <input type="password" className="form-control rounded-0" id="password" placeholder='Enter Password' onChange={handleInput} name="password"  />
                    {
                            error.password && <span className='text-danger '>{error.password}</span>
                     }
                </div>
                <button type="submit"  className="btn btn-primary w-100 rounded-0">Register</button>
                <p className='m-3'>Already have account</p>
                <Link to="/" className="btn btn-white w-100 rounded-0 text-primary ">Login</Link>
                
                
            </form>
        </div>
   </div>
</div>
  )
}
