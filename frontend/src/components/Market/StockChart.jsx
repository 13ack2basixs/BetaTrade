// components/Market/StockChart.jsx
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import SearchBar from './SearchBar';
import Trade from './Trade';
import styled from 'styled-components';
import useMarketData from '../../hooks/useMarketData';
import { baseUrl } from '../../api/base';

const OuterContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding-left: 2rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
`;

const Symbol = styled.h3`
  font-size: 1.5em;
  margin-bottom: 0;
`;

const SectorandIndustry = styled.div`
  display: flex;
  flex-direction: row;
`;

const CurrentPrice = styled.h2`
  font-size: 1.75em;
`;

const ViewModeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
`;

const ViewMode = styled.button`
  display: inline-block;
`;

const RightSpacer = styled.div`
  width: 20vw;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
`;

const StockChart = () => {
  const [symbol, setSymbol] = useState('');
  const [profile, setProfile] = useState('');
  const [marketOpen] = useState(true); // or replace with actual logic
  const [timeframe, setTimeframe] = useState("daily");
  const { data, currentPrice } = useMarketData(symbol, timeframe, marketOpen, (updated) => {
    renderChart(updated, symbol);
  });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchStockData = async (ticker) => {
    try {
      const response = await axios.get(`${baseUrl}/api/market/historical/${ticker}`);
      const bars = response.data.bars[ticker] || [];
      renderChart(bars, ticker);
      console.log("Stock chart rendered");
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchTickerProfile = async (ticker) => {
    try {
      const response = await axios.get(`${baseUrl}/api/profile/${ticker}`);
      const profile = response.data[0];
      setProfile(profile);
      console.log("Ticker profile rendered");
    } catch (error) {
      console.error('Error fetching ticker profile:', error);
    }
  }

  const renderChart = (chartData, symbol) => {
    if (!chartData.length || !chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: chartData.map((bar) => new Date(bar.t).toLocaleDateString()),
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: chartData.map((bar) => bar.c),
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  useEffect(() => {
    if (data.length && symbol) {
      renderChart(data, symbol);
    }
  }, [data, symbol]);

  const handleSearch = (ticker) => {
    setSymbol(ticker);
    fetchStockData(ticker);
    fetchTickerProfile(ticker);
  };

  return (
    <OuterContainer>
      <LeftPanel>
        <SearchBar onSearch={handleSearch} />
        {symbol && <Symbol>{symbol}</Symbol>}
        {symbol && <span>{profile.companyName}</span> }
        {symbol && <SectorandIndustry>
            <span>{profile.sector}</span> &nbsp;
            <span>•</span> &nbsp;
            <span>{profile.industry}</span>
          </SectorandIndustry> }
        {symbol && <a href= {`${profile.website}`} target="_blank" rel="noopener noreferrer">{symbol}&apos;s Website</a> }
        {currentPrice && <CurrentPrice>${currentPrice.toFixed(2)}USD</CurrentPrice>}
        <ViewModeContainer>
          <ViewMode onClick={() => setTimeframe('live')}>Live: 1Min</ViewMode>
          <ViewMode onClick={() => setTimeframe('daily')}>1D</ViewMode>
          <ViewMode onClick={() => setTimeframe('weekly')}>1W</ViewMode>
          <ViewMode onClick={() => setTimeframe('monthly')}>1M</ViewMode>
          <ViewMode onClick={() => setTimeframe('yearly')}>1Y</ViewMode>
        </ViewModeContainer>
        <ChartContainer>
            <canvas ref={chartRef} />
        </ChartContainer>
      </LeftPanel>
      <RightSpacer>
        <Trade symbol={symbol} currentPrice={currentPrice?.toString() || "0"} />
      </RightSpacer>
    </OuterContainer>
  );
};

export default StockChart;
