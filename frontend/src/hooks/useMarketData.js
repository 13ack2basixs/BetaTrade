import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const useMarketData = (symbol, marketOpen, renderChart) => {
    const [data, setData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (symbol) {
            axios.get(`http://localhost:3001/api/market/historical/${symbol}`)
                .then(response => {
                    const bars = response.data.bars[symbol] || [];
                    setData(bars);
                    if (bars.length) {
                        setCurrentPrice(bars[bars.length - 1].c);
                    }
                });

            axios.post('http://localhost:3001/api/subscribe', { symbol }).catch(console.error);
        }
    }, [symbol]);

    useEffect(() => {
        if (!marketOpen || !symbol) return;

        const socket = new WebSocket('ws://localhost:3001');
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const newBar = JSON.parse(event.data);
            if (newBar.S === symbol) {
                setCurrentPrice(newBar.c);
                setData(prev => {
                    const updated = [...prev, newBar];
                    renderChart && renderChart(updated);
                    return updated;
                });
            }
        };

        return () => socket.close();
    });

    return { data, currentPrice };
};

export default useMarketData;
