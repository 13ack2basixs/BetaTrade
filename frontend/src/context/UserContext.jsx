import { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [seenMarketModal, setSeenMarketModalState] = useState(() => {
    return sessionStorage.getItem('seenMarketModal') === 'true';
  });

  const login = (userData) => {
    console.log('Logging in user:', userData);
    setTimeout(() => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Reset modal visbility for new login
      setSeenMarketModal(false);
      sessionStorage.removeItem('seenMarketModal');
    }, 100); // 100ms delay
    
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved user from localStorage:', storedUser); // Debugging log
    if (storedUser) {
        setUser(storedUser);
    }
  }, []);

  // Wrapper fn that updates React state and session storage
  const setSeenMarketModal = (value) => {
    setSeenMarketModalState(value);
    sessionStorage.setItem('seenMarketModal', value);
  };

  // Remove seenMarketModal and user session 
  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setSeenMarketModal(false);
    sessionStorage.removeItem('seenMarketModal');
    localStorage.removeItem('user');
  };

  return (
    // Pass down market modal state variables as props
    <UserContext.Provider value={{ user, login, logout, seenMarketModal, setSeenMarketModal }}> 
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserProvider, useUser, UserContext };