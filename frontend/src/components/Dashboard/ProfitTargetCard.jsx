import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const ProfitTargetCard = () => {
  return (
    <Card>
      <h3>Profit Target</h3>
      <p>Coming soon: portfolio breakdown</p>
    </Card>
  );
};

export default ProfitTargetCard;
