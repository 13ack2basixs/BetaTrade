import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const Card = styled.div`
  grid-column: 1 / 4;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 93.5%;
`;

const CashAndAssets = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  justify-content: center;
  font-size: 1.1em;
`;

const PnLPositionCard = ({ refresh }) => {
  const { user } = useUser();
  const [totalCash, setTotalCash] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [positions, setPositions] = useState([]);
  const [livePrices, setLivePrices] = useState({});

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchCashAndAssets = async () => {
      try {
        const res = await axios.post('http://localhost:3001/api/cash-and-assets', { userId: user._id });
        setTotalCash(res.data.totalCash);
        setTotalAssets(res.data.totalAssets);
      } catch (err) {
        console.error("Error fetching total cash and assets:", err);
      } 
    };

    fetchCashAndAssets();
  }, [user, refresh]); // If deposit funds button clicked fetch cash and assets again

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchPortfolio = async () => {
      const res = await axios.get(`http://localhost:3001/api/portfolio/${user._id}`);
      setPositions(res.data.positions);
    };

    fetchPortfolio();
  }, [user]);

  useEffect(() => {
    if (!user || !user._id) return;

    const subscribeToSymbols = async () => {
      if (!user || !user._id) return;
      try {
        await axios.post(`http://localhost:3001/api/subscribe/multiple/${user._id}`);
      } catch (err) {
        console.error("Failed to subscribe to symbols:", err);
      }
    };
  
    subscribeToSymbols();
  }, [user]);
  

  // Fetch current prices
  useEffect(() => {
    if (!user || !user._id) return;

    const interval = setInterval(async () => {
      const res = await axios.get(`http://localhost:3001/api/prices/${user._id}`);
      setLivePrices(res.data);
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

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
  
  const data = {
    labels: positions.map(p => p.symbol), // Symbols (y axis)
    datasets: [{
      label: 'PnL per Position (US$)',
      data: positions.map(p => { // PnL (x axis)
        const livePrice = Number(livePrices[p.symbol]);
        return ((livePrice - p.averagePrice) * p.quantity).toFixed(2);
      }),
      backgroundColor: colorScheme,
    }]
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `P&L: $${context.raw}`
        }
      }
    }
  };
  
  return (
    <Card>
      <h3>Real-Time Position PnL (Updated Every Minute)</h3>
      <CashAndAssets>
        <span>Total Cash Value: ${totalCash.toFixed(2)}</span> 
        <span>Total Asset Value: ${totalAssets.toFixed(2)}</span>
      </CashAndAssets>
      <Bar data={data} options={options} />
    </Card>
  );
};

PnLPositionCard.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default PnLPositionCard;
