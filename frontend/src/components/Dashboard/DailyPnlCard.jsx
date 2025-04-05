import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const DailyPnlCard = () => {
  return (
    <Card>
      <h3>Daily PnL</h3>
      <p>Coming soon: daily pnl</p>
    </Card>
  );
};

export default DailyPnlCard;
