import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const Trade = ({ symbol, currentPrice }) => {
    console.log("Trade component is rendered");  // Debug log

    const { user } = useUser();
    const [formData, setFormData] = useState({
        symbol: symbol,
        quantity: 1,
        orderType: 'Market',
        action: 'Buy',
    });

    useEffect(() => {
        if (user) {
            console.log("User found in context:", user);
        } else {
            console.log("User not found, waiting for context update...");
        }
    }, [user]);

    useEffect(() => {
        setFormData(prevData => ({ ...prevData, symbol }));
    }, [symbol]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            alert("User ID is missing. Please log in.");
            return;
        }

        console.log('Submitting trade with data:', { 
            ...formData, 
            userId: user._id,  // Use user._id instead of user.id
            price: currentPrice,
            quantity: Number(formData.quantity),
        });

        try {
            const response = await axios.post('http://localhost:3001/trade', { 
                ...formData, 
                userId: user._id,
                price: currentPrice
            });
            alert(`Trade successful: ${response.data._id}`);
        } catch (error) {
            alert(`Trade failed: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', background: '#f8f9fa', borderRadius: '10px', width: '300px' }}>
            <h4>Trade {symbol}</h4>
            <div className="mb-3">
                <label className="form-label">Action</label>
                <select
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Order Type</label>
                <select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="Market">Market</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-control"
                    min="1"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit Order</button>
        </form>
    );
};

export default Trade;
