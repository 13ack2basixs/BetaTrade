import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 1.5rem;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111111;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const Feature = styled.div`
  text-align: center;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureText = styled.p`
  color: #666666;
  line-height: 1.6;
`;

const ExtraSection = styled.div`
  margin-top: 4rem;
  color: #444;

  p {
    text-align: center;
    margin-bottom: 2rem;
  }
`;


const Features = () => {
  return (
    <Section id="features">
      <Container>
        <Heading>Features</Heading>
        <FeatureList>
          <Feature>
            <FeatureTitle>Real-time Stock Data</FeatureTitle>
            <FeatureText>Access live stock data to track market performance and make informed trading decisions</FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Paper Trading</FeatureTitle>
            <FeatureText>Trade with simulated funds to practice without any risk</FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Portfolio Management</FeatureTitle>
            <FeatureText>Manage your portfolio, track your investments, and visualize your growth over time</FeatureText>
          </Feature>
          <Feature>
            <FeatureTitle>Order History</FeatureTitle>
            <FeatureText>Keep track of your trading activity and analyze your past decisions to learn and improve</FeatureText>
          </Feature>
        </FeatureList>
        <ExtraSection>
          <p style={{ fontSize: "1.5rem" }}>In the future, we hope to implement these extra features:</p>
          <FeatureList>
            <Feature>
              <FeatureTitle>Walkthrough for beginners</FeatureTitle>
              <FeatureText>Guided onboarding to help new users get started confidently</FeatureText>
            </Feature>
            <Feature>
              <FeatureTitle>AI Activity Rating</FeatureTitle>
              <FeatureText>Smart scoring system to evaluate and give feedback on your trades</FeatureText>
            </Feature>
            <Feature>
              <FeatureTitle>Gamification</FeatureTitle>
              <FeatureText>Earn badges, streaks, and rewards to make trading fun and engaging</FeatureText>
            </Feature>
          </FeatureList>
          <p style={{ fontSize: "1.5rem" }}>So stay tuned!</p>
        </ExtraSection>

      </Container>
    </Section>
  );
};

export default Features;
