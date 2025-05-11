import { useEffect, createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log('Logging in user:', userData);
    setTimeout(() => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }, 100); // 100ms delay
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved user from localStorage:', storedUser); // Debugging log
    if (storedUser) {
        setUser(storedUser);
    }
  }, []);

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  console.log('User context accessed:', context); // Debugging log
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UserProvider, useUser, UserContext };