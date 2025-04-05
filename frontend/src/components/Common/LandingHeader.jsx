import styled from 'styled-components';
import LoginButton from '../Landing/LoginButton';

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
    { name: 'Intro', href: '#intro' },
    { name: 'Motivation', href: '#motivation'},
    { name: 'Features', href: '#features'},
    { name: 'How-it-works', href: '#how-it-works'},
    { name: 'About', href: '#about'},
]

const LandingHeader = () => {
    return (
        <HeaderContainer>
          <Nav>
              {navItems.map(item => (
                <a key={item.href} href={item.href}>{item.name}</a>
              ))}
          </Nav>
          <RightSection>
            <LoginButton />
          </RightSection>
        </HeaderContainer>
    )
}

export default LandingHeader;