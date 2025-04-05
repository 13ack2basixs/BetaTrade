import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/register', {name, email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            }
            else{
                alert("Registered successfully! Please Login to proceed.")
                navigate('/login');
            }
            
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            <h2>Create an account with us!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="form-label">
                        <strong >Name</strong>
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter Name"
                        className="form-control" 
                        id="name" 
                        onChange={(event) => setName(event.target.value)}
                        required
                    /> 
                </div>
                <div>
                    <label htmlFor="email" className="form-label">
                        <strong>Email Id</strong>
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
                <button type="submit">Register</button>
            </form>

            <p>Already have an account ?</p>
            <Link to='/login' className="btn btn-secondary">Login</Link>
        </div>
    )
}

export default Register