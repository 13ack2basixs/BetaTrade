import styled from 'styled-components';
import placeholder from '../../assets/placeholderlinegraph.png';

const Card = styled.div`
  grid-column: 1 / 4;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TotalBalanceCard = () => {
  return (
    <Card>
      <h3>Total Balance</h3>
        {/* Chart */}
      <img src={placeholder} alt='linegraph' style={{ maxWidth: '650px', width: '100%', height: 'auto' }} />
    </Card>
  );
};

export default TotalBalanceCard;
