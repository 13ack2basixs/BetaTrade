import styled from 'styled-components';
import placeholder from '../../assets/placeholderlinegraph.png';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import PropTypes from 'prop-types';

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
    const fetchPortfolio = async () => {
      const res = await axios.get(`http://localhost:3001/api/portfolio/${user._id}`);
      setPositions(res.data.positions);
    };
    fetchPortfolio();
  }, [user]);

  // Fetch current prices every 3s
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get(`http://localhost:3001/api/prices/${user._id}`);
      setLivePrices(res.data);
    }, 3000);
    return () => clearInterval(interval);
  }, [user]);
  

  return (
    <Card>
      <h3>Total Balance</h3>
      <CashAndAssets>
        <span>Total Cash Value: ${totalCash.toFixed(2)}</span> 
        <span>Total Asset Value: ${totalAssets.toFixed(2)}</span>
      </CashAndAssets>
      <p>{JSON.stringify(positions)}</p>
      <p>{JSON.stringify(livePrices)}</p>
      <img src={placeholder} alt='linegraph' style={{ maxWidth: '900px', width: '100%', height: 'auto' }} />
    </Card>
  );
};

PnLPositionCard.propTypes = {
  refresh: PropTypes.bool.isRequired,
};

export default PnLPositionCard;
