import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.a`
	display: flex;
	flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
	width: 90%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
	margin: 0 10px;
	text-decoration: none;
	color: black;
`;

const SimilarNewsCard = ({ news }) => {
	return (
		<Card>
      <h3>{news.title}</h3>
      <p>{news.snippet}</p>
    </Card>
	);
};

SimilarNewsCard.propTypes = {
  news: PropTypes.object.isRequired,
}

export default SimilarNewsCard;