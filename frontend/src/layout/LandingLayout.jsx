import styled from 'styled-components';

const StyledLandingLayout = styled.div`
  background: linear-gradient(to right, #fdf4ff, #f3e8ff);
  color: #111111;
  min-height: 100vh;
`;


const LandingLayout = ({ children }) => {
  return (
    <StyledLandingLayout>
      <main style={{ flex: 1 }}>{children}</main>
    </StyledLandingLayout>
  );
};

export default LandingLayout;
