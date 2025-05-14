import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLoadButton = styled.button`
	display: block;
  background-color: #111111;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
	margin: auto;

  &:hover {
    background-color: #333333;
  }
`;

const LoadButton = ({ setPage }) => {
	const handleLoadNews = async () => {
		setPage(prev => prev + 1);
	};

	return (
	<div>
		<StyledLoadButton type="submit" onClick={handleLoadNews}>Load More</StyledLoadButton>
	</div>
	)
};

LoadButton.propTypes = {
	setPage: PropTypes.func.isRequired,
}

export default LoadButton;