import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import { useUser } from '../../context/UserContext';

const Card = styled.div`
  grid-column: 4 / 6;
  grid-row: 3 / 5;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DiversificationCard = () => {
  const { user } = useUser();
  const [trades, setTrades] = useState({});
  const [uniqueSymbols, setUniqueSymbols] = useState([]);
  const [sectorTotals, setSectorTotals] = useState({});

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const colorScheme = [
    "#25CCF7","#FD7272","#54a0ff","#00d2d3",
    "#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
    "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
    "#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
    "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
    "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
    "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
    "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
    "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"
  ] 
  
  // { sector: price,... }
  const fetchUserTrades = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get('http://localhost:3001/api/trade/');
        const allTrades = res.data;
        const userTrades = allTrades.filter(t => t.userId === user._id);
        const uniqueSymbols = [...new Set(userTrades.map(t => t.symbol))];
        setTrades(userTrades);
        setUniqueSymbols(uniqueSymbols);
      } catch (err) {
        console.error("Failed to fetch trades:", err);
      }
    };

  const fetchProfiles = async (uniqueSymbols) => {
    const profiles = await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        const res = await axios.get(`http://localhost:3001/api/profile/${symbol}`);
        return {
          symbol,
          sector: res.data[0]?.sector || 'Unknown',
        };
      })
    );

    const symbolToSector = {};
    profiles.forEach(p => {
      symbolToSector[p.symbol] = p.sector;
    });

    const sectorTotals = {};
    trades.forEach(t => {
      const sector = symbolToSector[t.symbol] || 'Unknown';
      sectorTotals[sector] = (sectorTotals[sector] || 0) + t.price; // or t.price * t.quantity
    });
    setSectorTotals(sectorTotals);
  };

  useEffect(() => {
    fetchUserTrades();
  }, [user]);

  useEffect(() => {
    if (uniqueSymbols.length && trades.length) {
      fetchProfiles(uniqueSymbols);
    }
  }, [uniqueSymbols, trades]);


  const renderChart = (chartData) => {
    if (!Object.keys(chartData).length || !chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'pie', 
      data: {
        labels: Object.keys(chartData),
        datasets: [{
            data: Object.values(chartData),
            backgroundColor: colorScheme,
            fill: false,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
                font: {
                    size: 14
                },
                color: '#333'
            }
          }
        }
      },

    })
  };

  useEffect(() => {
    renderChart(sectorTotals);
  }, [user, sectorTotals]);

  return (
    <Card>
      <h3>Sector Diversity</h3>
      <ChartContainer>
      <div style={{ width: '500px' }}>
        <canvas ref={chartRef} />
      </div>
      </ChartContainer>
    </Card>
  );
};

export default DiversificationCard;
