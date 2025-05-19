import styled from 'styled-components';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import PropTypes from 'prop-types';
import { baseUrl } from '../../api/base';

const StyledDepositButton = styled.button`
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

const DepositButton = ({ setRefresh }) => {
	const { user } = useUser();

	const handleDepositClick = async () => {

    // Rotate between true and false
    const handleRefresh = () => {
      setRefresh(prev => !prev);
    };

    try {
      await axios.post(`${baseUrl}/api/deposit`, { userId: user._id });
      alert("$10000 deposited!");
      
      handleRefresh(); // If button is clicked change state of refresh variable

    } catch (err) {
      console.error("Deposit failed:", err);
    }
  };

	return (
    <div>
      <StyledDepositButton type="submit" onClick={handleDepositClick}>Deposit Funds</StyledDepositButton>
    </div>
	);
};

DepositButton.propTypes = {
	setRefresh: PropTypes.func.isRequired,
};

export default DepositButton;