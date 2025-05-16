import { useEffect, useState } from 'react';
import axios from 'axios';

const useMarketStatus = () => {
  const [marketOpen, setMarketOpen] = useState(null);

  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/market/status');
        setMarketOpen(res.data.is_open);
      } catch (err) {
        console.error('Failed to fetch market status:', err);
        setMarketOpen(true);
      }
    };
    
    fetchMarketStatus();
  }, []);

  return marketOpen;
};

export default useMarketStatus;
