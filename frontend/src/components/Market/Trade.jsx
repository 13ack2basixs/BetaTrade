import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const OrderForm = styled.form`
  
`;

const Title = styled.h4`
  font-size: 1.5em;
`;

const DropdownContainer = styled.div`
  margin: 10px 0;
`;

const Dropdown = styled.select`
  padding: 0.5rem 0.75rem;
  width: 200px;
  border: 1px solid #E8EAED;
  border-radius: 5px;
  background: white;
  box-shadow: 0 1px 3px -2px #9098A9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
`;

const InputContainer = styled.div`
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  margin-right: 0.5rem;
  width: 100px;
  box-shadow: 0 1px 3px -2px #9098A9;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const SubmitButton = styled.button`
  background-color: #111111;
  color: #ffffff;
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #333333;
  }
`;

const Trade = ({ symbol, currentPrice }) => {
    console.log("Trade component is rendered");

    const { user } = useUser();
    const [formData, setFormData] = useState({
        symbol: symbol,
        quantity: '',
        orderType: '',
        action: '',
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

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (!user || !user._id) {
            alert("User ID is missing. Please log in.");
            return;
        }

        console.log('Submitting trade with data:', { 
            ...formData, 
            userId: user._id,  // Use user._id instead of user.id
            price: Number(currentPrice),
            quantity: Number(formData.quantity),
        });

        try {
            const response = await axios.post('http://localhost:3001/api/trade', { 
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
        <OrderForm onSubmit={handleSubmitOrder}>
            <Title>Trade {symbol}</Title>
            <DropdownContainer>
                <Dropdown
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="" disabled>Action</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </Dropdown>
            </DropdownContainer>
            <DropdownContainer>
                <Dropdown
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="" disabled>Order Type</option>
                    <option value="Market">Market</option>
                </Dropdown>
            </DropdownContainer>
            <InputContainer>
                <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Quantity"
                    required
                />
            </InputContainer>
            <SubmitButton type="submit">Submit Order</SubmitButton>
        </OrderForm>
    );
};

Trade.propTypes = {
  symbol: PropTypes.string.isRequired,
  currentPrice: PropTypes.string.isRequired,
};

export default Trade;
