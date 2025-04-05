import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 1.5rem 4rem;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 1rem;
`;

const Subtext = styled.p`
  font-size: 1.25rem;
  color: #666666;
  margin-bottom: 2rem;
`;

const JoinButton = styled.button`
  background-color: #111111;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;

const Intro = () => {
  return (
    <Section id="intro">
      <Container>
        <Heading>Welcome to BetaTrade</Heading>
        <Subtext>This app hopes to provide you with a safe space to explore investing, join us and have fun!</Subtext>
        <JoinButton>Get Started</JoinButton>
      </Container>
    </Section>
  );
};

export default Intro;
