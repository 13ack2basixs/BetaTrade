import styled from "styled-components";

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  text-align: center;
`;

const OrderHistoryCard = () => {
  return (
    <Card>
      <h3>Order History</h3>
      <p>Coming soon: order history</p>
    </Card>
  );
};

export default OrderHistoryCard;
