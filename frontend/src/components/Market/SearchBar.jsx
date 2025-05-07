import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  margin-right: 0.5rem;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const StyledButton = styled.button`
  background-color: #111111;
  color: #ffffff;
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;

const SearchForm = styled.form`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleType = (e) => {
    e.preventDefault();
      setInput(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSearch(input.trim());
    }
  };

  return (
    <SearchForm onChange={handleType} onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter stock symbol (e.g. AAPL)"
      />
      <StyledButton type="submit">Search</StyledButton>
    </SearchForm>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
