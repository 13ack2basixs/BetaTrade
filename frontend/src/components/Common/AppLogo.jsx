import styled from "styled-components";

const Logo = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 1.4rem;
  font-weight: 600;
  flex: 1;
`;

const AppLogo = () => {
    return (
        <Logo href="/">BetaTrade</Logo>
    );
};

export default AppLogo;