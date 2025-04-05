import styled from 'styled-components';
import placeholder from '../../assets/placeholderpiechart.svg';

const Card = styled.div`
  grid-column: 4 / 6;
  grid-row: 3 / 5;
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const DiversificationCard = () => {
  return (
    <Card>
      <h3>Diversification</h3>
      <img src={placeholder} alt='piechart' style={{ maxWidth: '500px', width: '100%', height: 'auto' }} />
    </Card>
  );
};

export default DiversificationCard;
