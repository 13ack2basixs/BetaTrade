import styled from 'styled-components';
import LoginButton from '../Landing/LoginButton';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  flex: 1;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  font-size: 1.1rem;
  justify-content: center;
  flex: 2;

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
  flex: 1;
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
          <InnerContainer>
            <Logo href="/">BetaTrade</Logo>
            <Nav>
                {navItems.map(item => (
                  <a key={item.href} href={item.href}>{item.name}</a>
                ))}
            </Nav>
            <RightSection>
              <LoginButton />
            </RightSection>
          </InnerContainer>
        </HeaderContainer>
    )
}

export default LandingHeader;