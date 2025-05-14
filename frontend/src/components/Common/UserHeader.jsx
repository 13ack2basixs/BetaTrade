import styled from 'styled-components';
import LogoutButton from '../Common/LogoutButton';
import DepositButton from '../Common/DepositButton';
import PropTypes from 'prop-types';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // centers nav
  padding: 1.5rem 3rem;
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  font-size: 1.1rem;
  margin: 0 auto;
  
  a {
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const navItems = [
    { name: 'Dashboard', href: '/dashboard'},
    { name: 'Market', href: '/market' },
    { name: 'News', href: '/news'},
    { name: 'Resources', href: '#'},
]

const UserHeader = ({ setRefresh }) => {
    return (
        <HeaderContainer>
          <Nav>
              {navItems.map(item => (
                <a key={item.href} href={item.href}>{item.name}</a>
              ))}
          </Nav>
          <RightSection>
            {/* Market Status Indicator */}
            <DepositButton setRefresh={setRefresh}/> {/* Continue sending props down */}
            <LogoutButton />
          </RightSection>
        </HeaderContainer>
    )
};

UserHeader.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export default UserHeader;