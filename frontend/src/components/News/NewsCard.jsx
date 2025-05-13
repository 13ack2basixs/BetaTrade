import styled from 'styled-components';
import PropTypes from 'prop-types';
import SimilarNewsCard from './SimilarNewsCard';

const Card = styled.a`
	display: flex;
	flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
	width: 90%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
	margin: 20px;
	text-decoration: none;
	color: black;
`;

const ContentContainer = styled.div`
	flex-grow: 1;
`;

const NewsFooter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 100px;
`;

const NewsDescription = styled.p`
	margin-bottom: 5px;
	margin-top: 20px;
	font-size: 1.1rem;
	text-decoration: underline;
	text-underline-offset: 2px;
`;

const SimilarNewsContainer = styled.div`
	display: flex;
`;

const NewsCard = ({ news }) => {
	const timestamp = news.published_at;
	const formatDate = (value) => {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
	};
	const date = formatDate(timestamp);

  return (
		<Card href={news.url} rel='noreferrer' target='_blank'>
			<ContentContainer>
				<h3>{news.title}</h3>
				<p>{news.snippet}</p>
			</ContentContainer>
			<NewsFooter>
				<span>Keywords: {news.keywords}</span>
				<span>Date Published: {date.toLocaleString()}</span>
			</NewsFooter>
			{news.similar.length > 0 && <NewsDescription>News you may find similar:</NewsDescription>}
			<SimilarNewsContainer>
				{news.similar && news.similar.map((n, i) => (
					<SimilarNewsCard key={i} news={n} />
				))}
			</SimilarNewsContainer>
		</Card>
  );
};

NewsCard.propTypes = {
	news: PropTypes.object.isRequired,
}

export default NewsCard;
