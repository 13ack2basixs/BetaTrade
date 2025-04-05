import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledLoginButton = styled.button`
  background-color: #111111;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;

const LoginButton = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }
    return (
        <div>
            <StyledLoginButton type="submit" onClick={handleLoginClick}>Log In</StyledLoginButton>
        </div>
    )
}

export default LoginButton;