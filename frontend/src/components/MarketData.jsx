import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Trade from './Trading/Trade';

function MarketData({ symbol }) {
    const [data, setData] = useState([]);
    const [marketOpen, setMarketOpen] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(null);
    const socketRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        checkMarketStatus();

        if (symbol) {
            console.log(`Fetching historical data for: ${symbol}`);
            axios.get(`http://localhost:3001/historical/${symbol}`)
                .then(response => {
                    console.log('Fetched data:', response.data);
                    const barsData = response.data.bars[symbol] || [];
                    setData(barsData);
                    if (barsData.length > 0) {
                        const closingPrice = barsData[barsData.length - 1].c;
                        setCurrentPrice(closingPrice); 
                        console.log(`Closing price for ${symbol}: ${closingPrice}`);
                    }
                })
                .catch(error => console.error('Error fetching historical data:', error));

            axios.post('http://localhost:3001/subscribe', { symbol })
                .then(response => {
                    console.log(response.data.message);
                })
                .catch(error => console.error('Error subscribing to symbol:', error));
        }
    }, [symbol]);

    useEffect(() => {
        if (data.length > 0) {
            renderChart(data);
        }
    }, [data]);

    const checkMarketStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3001/market-status');
            const { is_open } = response.data;
            console.log(`Market status: ${is_open ? "Open" : "Closed"}`);
            setMarketOpen(is_open);
        } catch (error) {
            console.error('Error checking market status:', error);
        }
    };

    const renderChart = (chartData) => {
        if (!chartData.length) {
            console.log('No data to render chart');
            return;
        }

        const ctx = document.getElementById('myChart').getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.map(bar => new Date(bar.t).toLocaleDateString()),
                datasets: [{
                    label: 'Stock Price',
                    data: chartData.map(bar => bar.c),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false,
                }],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });
    };

    useEffect(() => {
        /*if (!marketOpen) {
            console.log('Market is closed, skipping WebSocket connection');
            return;
        }*/

        const socket = new WebSocket('ws://localhost:3001');
        socketRef.current = socket;

        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            console.log('WebSocket message received:', event.data); 
            const newBar = JSON.parse(event.data);
            console.log('New bar from WebSocket:', newBar);
            if (newBar.S === symbol) {  // Ensure the message is for the current symbol
                setCurrentPrice(newBar.c); 
                console.log(`Updated current price for ${symbol}: ${newBar.c}`);
                setData(prevData => {
                    const updatedData = [...prevData, newBar];
                    renderChart(updatedData);
                    return updatedData;
                });
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Check WebSocket status every 5 seconds
        const interval = setInterval(() => {
            console.log('WebSocket connection status:', socket.readyState);
        }, 5000);

        return () => {
            socket.close();
            clearInterval(interval);
        };
    }, [marketOpen, symbol]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {!marketOpen && <p style={{ marginBottom: '20px' }}>The market is currently closed.</p>}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ width: '800px', height: '400px', position: 'relative' }}>
                    <canvas id="myChart" style={{ width: '100%', height: '100%' }}></canvas>
                </div>
                <div style={{ marginLeft: '20px', width: '300px' }}>
                    <h4>{currentPrice ? `${currentPrice} USD` : 'Loading...'}</h4>
                    <Trade symbol={symbol} currentPrice={currentPrice} />
                </div>
            </div>
        </div>
    );
    
}

export default MarketData;
