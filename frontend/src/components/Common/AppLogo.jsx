import styled from "styled-components";

const Logo = styled.a`
  font-size: 1.4rem;
  font-weight: 600;
  padding: 2.15rem 3rem;
  line-height: 1;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const AppLogo = () => {
    return (
        <Logo href="/">BetaTrade</Logo>
    );
};

export default AppLogo;