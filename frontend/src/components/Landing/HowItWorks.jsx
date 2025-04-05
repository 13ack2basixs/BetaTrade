import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 1.5rem;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 3rem;
`;

const Steps = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Step = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const StepText = styled.p`
  color: #666666;
  line-height: 1.6;
`;

const HowItWorks = () => {
  return (
    <Section id="how-it-works">
      <Container>
        <Heading>How It Works</Heading>
        <Steps>
          <Step>
            <StepTitle>Step 1: Create an Account</StepTitle>
            <StepText>Sign up to get started with paper trading and access live stock data</StepText>
          </Step>
          <Step>
            <StepTitle>Step 2: Fund Your Virtual Account</StepTitle>
            <StepText>Get simulated funds and begin trading without any risk or real investment</StepText>
          </Step>
          <Step>
            <StepTitle>Step 3: Start Trading</StepTitle>
            <StepText>Buy and sell stocks in real-time to learn the process and track your portfolio</StepText>
          </Step>
        </Steps>
      </Container>
    </Section>
  );
};

export default HowItWorks;
