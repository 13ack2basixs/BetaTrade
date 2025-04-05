import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Import useUser
import LandingLayout from '../layout/LandingLayout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useUser(); // Get login function from the user context

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            console.log(response);
            if (response.status === 200 && response.data.status === "Success") {
                console.log("Login Success");
                alert('Login successful!');
                login(response.data.user); // Assuming the user object is returned in response.data.user
                navigate('/home');
            } else {
                alert(response.data.status); // Display the error message from the server
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <LandingLayout>
            <div className='login-modal'>
                <h2 className=''>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="email" className="form-label">
                            <strong>Email </strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="email" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="password" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don&apos;t have an account?</p>
                <Link to='/register'>Register</Link>
            </div>
        </LandingLayout>
    )
}

export default Login;
