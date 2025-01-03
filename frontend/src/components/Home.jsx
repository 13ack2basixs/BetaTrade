import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import MarketData from './MarketData';
import { useUser } from './UserContext'; 
import './Home.css'; 

const Home = () => {
  const [symbol, setSymbol] = useState('');
  const [searchSymbol, setSearchSymbol] = useState('');
  const { user, logout } = useUser(); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSymbol(symbol.toUpperCase());
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Debugging to check if the user is logged in
  console.log("User:", user);

  return (
    <div style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}} className="d-flex flex-column justify-content-start align-items-center text-center vh-100">
        <div className="mt-4">
            <h1>Dashboard</h1>
            <form onSubmit={handleSearch} className="d-flex justify-content-center align-items-center">
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="Enter Stock Symbol"
                    className="form-control"
                    style={{ width: '200px', marginRight: '10px' }}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div className="mt-4">
                <MarketData symbol={searchSymbol} />
            </div>
        </div>
        {user && (
          <div className="button-container mt-4">
            <Link to={`/portfolio/${user._id}`} className="btn btn-light my-2 mx-2">Portfolio</Link>
            <button onClick={handleLogout} className="btn btn-light my-2 mx-2">Logout</button>
          </div>
        )}
    </div>
  )
}

export default Home;
