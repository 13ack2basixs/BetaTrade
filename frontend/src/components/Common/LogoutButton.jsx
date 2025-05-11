import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledLogoutButton = styled.button`
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

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
      navigate("/");
    }
    return (
        <div>
            <StyledLogoutButton type="submit" onClick={handleLogoutClick}>Log Out</StyledLogoutButton>
        </div>
    )
}

export default LogoutButton;