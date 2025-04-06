import { useEffect, useState } from 'react';
import axios from 'axios';

const useMarketStatus = () => {
    const [marketOpen, setMarketOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/market-status')
            .then(res => setMarketOpen(res.data.is_open))
            .catch(console.error);
    }, []);

    return marketOpen;
};

export default useMarketStatus;
