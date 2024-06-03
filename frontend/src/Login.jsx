import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'
import './AppNew.css'

function Login() {
	const [values, setValues] = useState({
		email: '',
		password: ''
	})

	const navigate = useNavigate();

	const [errors, setErrors] = useState({})

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(Validation(values));
		if (errors.email === "" && errors.password === "") {
			axios.post('http://localhost:8000/login', values)
			.then(res => {
				if (res.data === "Success") {
					navigate('/home');
				} else {
					alert("No record exists");
				}
			})
			.catch(err => console.log(err));
		}
	}

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-30'>
            <h2 className='welcomeback'>Welcome Back!</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter your email' name='email' className='form-control rounded-0' onChange={handleInput}/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter your password' name='password' className='form-control rounded-0' onChange={handleInput}/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                <p>You agree to our terms and conditions</p>
                <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login