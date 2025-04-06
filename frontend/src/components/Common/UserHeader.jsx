import styled from 'styled-components';
import LogoutButton from '../Common/LogoutButton';

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
`;

const navItems = [
    { name: 'Dashboard', href: '/dashboard'},
    { name: 'Market', href: '/market' },
    { name: 'News', href: '#'},
    { name: 'Resources', href: '#'},
]

const UserHeader = () => {
    return (
        <HeaderContainer>
          <Nav>
              {navItems.map(item => (
                <a key={item.href} href={item.href}>{item.name}</a>
              ))}
          </Nav>
          <RightSection>
            <LogoutButton />
          </RightSection>
        </HeaderContainer>
    )
}

export default UserHeader;