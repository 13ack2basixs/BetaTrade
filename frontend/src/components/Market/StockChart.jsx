// components/Market/StockChart.jsx
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import placeholder from '../../assets/placeholderlinegraph.png';

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

const RightSpacer = styled.div`
  width: 20vw;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const StockChart = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchStockData = async (ticker) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/market/historical/${ticker}`);
      const bars = response.data.bars[ticker] || [];
      setData(bars);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setData([]);
    }
  };

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
  };

  return (
    <OuterContainer>
      <LeftPanel>
        <SearchBar onSearch={handleSearch} />
        {symbol && <h3>Viewing: {symbol}</h3>}
        <ChartContainer>
            <canvas ref={chartRef} />
        </ChartContainer>
      </LeftPanel>
      <RightSpacer />
    </OuterContainer>
  );
};

export default StockChart;
