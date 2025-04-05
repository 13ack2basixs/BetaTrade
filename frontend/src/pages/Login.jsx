import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Import useUser
import styled from 'styled-components';
 
const LoginModal = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormCard = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #333;
  }
`;

const RegisterText = styled.p`
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;

  a {
    color: #blue;
    font-weight: 500;
    text-decoration: underline;
    
  }
`;

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
        <LoginModal>
            <FormCard>
                <Heading>Welcome Back!</Heading>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            type="email" 
                            placeholder="Enter Email"
                            id="email" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            type="password" 
                            placeholder="Enter Password"
                            id="password" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </Form>
                <RegisterText>Don&apos;t have an account?
                    <Link to='/register'> Register</Link>
                </RegisterText>
            </FormCard>
        </LoginModal>
    )
}

export default Login;
