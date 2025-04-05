// For Best Trade, Worst Trade and Profit Factor
import styled from "styled-components";
import PropTypes from 'prop-types';

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const GeneralCard = ({ title, value }) => {
  return (
    <Card>
      <h4>{title}</h4>
      <p>{value}</p>
    </Card>
  );
};

GeneralCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}

export default GeneralCard;