import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../api/base';

const useMarketData = (symbol, timeframe, marketOpen, renderChart) => {
    const [data, setData] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (symbol) {
            axios.get(`${baseUrl}/api/market/historical/${symbol}?timeframe=${timeframe}`)
                .then(response => {
                    const bars = response.data.bars[symbol] || [];
                    setData(bars);
                    if (bars.length) {
                        setCurrentPrice(bars[bars.length - 1].c);
                    }
                });

            if (timeframe === 'live') {
                axios.post(`${baseUrl}/api/subscribe`, { symbol }).catch(console.error);
            }
        }
    }, [symbol, timeframe]);

    useEffect(() => {
        if (timeframe !== 'live' || !marketOpen || !symbol) return;

        const wsUrl = baseUrl.replace(/^http/, 'ws');
        const socket = new WebSocket(`${wsUrl}/ws`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const newBar = JSON.parse(event.data);
            console.log("New stock data received:", newBar);

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
