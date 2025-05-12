import AppLogo from "../components/Common/AppLogo";
import UserHeader from "../components/Common/UserHeader";
import NewsCard from "../components/News/NewsCard";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const NewsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const News = () => {
	const [allNews, setAllNews] = useState([]);

	useEffect(() => {
		const fetchLatestNews = async () => {
			try {
				const res = await axios.get('http://localhost:3001/api/news/latest');
				const news = res.data.data;
				setAllNews(news);
			} catch (err) {
				console.error("Error fetching latest news:", err);
			}	
		};

		fetchLatestNews();
	}, []);

	return (
		<div>
			<AppLogo />
			<UserHeader />
			<NewsContainer>
				{allNews.map((news, i) => (
					<NewsCard key={i} news={news}/>
				))}
			</NewsContainer>
		</div>
	);
};

export default News;