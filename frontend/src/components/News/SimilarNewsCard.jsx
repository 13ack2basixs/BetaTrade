import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
	display: flex;
	flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
	width: 90%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
	margin: 0 10px;
`;

const NewsTitle = styled.a`
	font-size: 1.3rem;
	font-weight: bold;
	text-decoration: none;
	color: black;

	&:hover {
    color: #4b0082;
    text-decoration: underline;
  }
`;

const SimilarNewsCard = ({ news }) => {
	return (
		<Card>
      <NewsTitle href={news.url} rel='noreferrer' target='_blank'>{news.title}</NewsTitle>
      <p>{news.snippet}</p>
    </Card>
	);
};

SimilarNewsCard.propTypes = {
  news: PropTypes.object.isRequired,
}

export default SimilarNewsCard;