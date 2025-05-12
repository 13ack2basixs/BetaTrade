import styled from 'styled-components';
import placeholder from '../../assets/placeholderlinegraph.png';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

const Card = styled.div`
  grid-column: 1 / 4;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TotalBalanceCard = () => {
  const { user } = useUser();
  const [totalCash, setTotalCash] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  useEffect(() => {
    const fetchCashAndAssets = async () => {
      try {
        const res = await axios.post(`http://localhost:3001/api/cash-and-assets`, { userId: user._id });
        setTotalCash(res.data.totalCash);
        setTotalAssets(res.data.totalAssets);
      } catch (err) {
        console.error("Error fetching total cash and assets:", err);
      }
    };

    fetchCashAndAssets();
  }, [user]);

  return (
    <Card>
      <h3>Total Balance</h3>
      <span>Total Cash Value: {totalCash}</span>
      <span>Total Asset Value: {totalAssets}</span>
      {/* Chart */}
      <img src={placeholder} alt='linegraph' style={{ maxWidth: '650px', width: '100%', height: 'auto' }} />
    </Card>
  );
};

export default TotalBalanceCard;
