import styled from "styled-components";
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../api/base';

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const Title = styled.h4`
  font-size: 1.3em;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
`;

const THead = styled.thead`
  background: #2d2d60;
  color: white;
`;

const HeaderRow = styled.tr`
`;

const Header = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  text-align: center;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Cell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const OrderHistoryCard = () => {
  const { user } = useUser();
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const getUserTrades = async () => {
      if (!user || !user._id) return;

      try {
        const res = await axios.get(`${baseUrl}/api/trade/`);
        const allTrades = res.data;
        const userTrades = allTrades.filter(t => t.userId === user._id);
        setTrades(userTrades);
      } catch (err) {
        console.error("Failed to fetch trades:", err);
      }
    };

    getUserTrades();
  }, [user])

  return (
    <Card>
      <Title>Order History</Title>
      <Table>
        <THead>
          <HeaderRow>
            <Header>S.No</Header>
            <Header>Symbol</Header>
            <Header>Type</Header>
            <Header>Qty</Header>
            <Header>Price</Header>
            <Header>Filled Date</Header>
          </HeaderRow>
        </THead>
        <tbody>
          {trades.length === 0 ? (
            <Row><Cell colSpan="6">No trades found.</Cell></Row>
          ) : (
            trades.map((trade, index) => (
              <Row key={index}>
                <Cell>{index + 1}</Cell>
                <Cell>{trade.symbol}</Cell>
                <Cell>{trade.type}</Cell>
                <Cell>{trade.quantity}</Cell>
                <Cell>${Number(trade.price).toFixed(2)}</Cell>
                <Cell>{new Date(trade.date).toLocaleString()}</Cell>
              </Row>
            ))
          )}
        </tbody>
      </Table>

    </Card>
  );
};

export default OrderHistoryCard;

