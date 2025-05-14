import AppLogo from "../components/Common/AppLogo";
import UserHeader from "../components/Common/UserHeader";
import NewsCard from "../components/News/NewsCard";
import LoadButton from "../components/News/LoadButton";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { RotatingLines } from 'react-loader-spinner';

const NewsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const News = () => {
	const [allNews, setAllNews] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
    const fetchLatestNews = async () => {
			setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:3001/api/news/latest', {
          params: { 
            page: page,
          }
        });
        const newNews = res.data.data;
		
        setAllNews(prevNews => {
          const combined = [...prevNews, ...newNews];
          
          const seenNews = new Set();
          const filtered = combined.filter(item => {
            if (seenNews.has(item.uuid)) return false;
            seenNews.add(item.uuid);
            return true;
          });

          return filtered;
        });
      } catch (err) {
        console.error("Error fetching latest news:", err);
      }	finally {
				setIsLoading(false);
			}
    };

		fetchLatestNews();
	}, [page]);

	return (
		<div>
			<AppLogo />
			<UserHeader />
			<NewsContainer>
				{allNews.map((news, i) => (
					<NewsCard key={i} news={news}/>
				))}
			</NewsContainer>
			{isLoading && <SpinnerContainer><RotatingLines height="50" width="50"/></SpinnerContainer>}
			{!isLoading && <LoadButton setPage={setPage}/>}
		</div>
	);
};

export default News;