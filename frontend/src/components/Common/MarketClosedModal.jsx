import styled from 'styled-components';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Backdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const RotatedX = styled(X)`
  transition: transform 0.3s ease; 

  &:hover {
    transform: rotate(90deg);
  }
`;

const MarketClosedModal = ({ setSeenMarketModal }) => {
  const [isModalClosed, setIsModalClosed] = useState(false);

  // Marks modal as seen in that user session
  useEffect(() => {
    if (isModalClosed) {
      setSeenMarketModal(true);
    }
  }, [isModalClosed, setSeenMarketModal]);
  
  if (isModalClosed) return null;

	return (
    <Backdrop>
      <Modal>
        <CloseButton><RotatedX onClick={() => setIsModalClosed(true)}/></CloseButton>
        <h2>Market Closed</h2>
        <p>The market is currently closed. Trading hours are from Monday to Friday, 9:30AM to 4:00PM (EST) / 10:30PM to 5:00AM (SGT)</p>
        <span>Click the following links to learn more:</span> <br />
        <a href='https://www.forex.com/en-sg/stock-trading/shares-market-hours/' target="_blank" rel="noopener noreferrer">Stock Market Hours</a> <br />
        <a href='https://www.nyse.com/markets/hours-calendars' target="_blank" rel="noopener noreferrer">US Stock Market Holidays</a>
      </Modal>
    </Backdrop>
	)
};

MarketClosedModal.propTypes = {
  setSeenMarketModal: PropTypes.func.isRequired,
};

export default MarketClosedModal;