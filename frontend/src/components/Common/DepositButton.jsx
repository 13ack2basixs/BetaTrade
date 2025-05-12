import styled from 'styled-components';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

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

const DepositButton = () => {
	const { user } = useUser();

	const handleDepositClick = async () => {
		try {
			await axios.post(`http://localhost:3001/api/deposit`, { userId: user._id });
			alert("$10000 deposited!");
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

export default DepositButton;