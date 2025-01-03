import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/portfolio/${userId}`);
        setPortfolio(response.data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/transactions/${userId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchPortfolio();
    fetchTransactions();
  }, [userId]);

  return (
    <div className="portfolio-container">
      <h2>Investment Portfolio</h2>
      {portfolio ? (
        <div className="card">
          <h3>Top Positions</h3>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Average Price</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.positions.map((position, index) => (
                <tr key={index}>
                  <td>{position.symbol}</td>
                  <td>{position.quantity}</td>
                  <td>{position.averagePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading portfolio...</p>
      )}
      <h2>Transaction History</h2>
      <div className="card">
        <h3>Recent Orders</h3>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.symbol}</td>
                <td>{transaction.type}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.price}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
