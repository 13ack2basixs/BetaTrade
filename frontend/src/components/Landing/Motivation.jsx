import styled from 'styled-components';

const Section = styled.section`
  padding: 6rem 1.5rem;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: #111111;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  color: #666666;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.25rem;
  color: #333333;
  border-left: 4px solid #000000;
  padding-left: 1rem;
  margin: 2rem 0;
`;

const Footer = styled.footer`
  font-weight: 500;
  margin-top: 0.5rem;
  color: #111111;
`;


const Motivation = () => {
  return (
    <Section id="motivation">
      <Container>
        <Heading>Why We Created This</Heading>
        <Paragraph>We know that many young adults are hesitant to take the first step into the stock market. With our paper trading app, you can practice in a safe, risk-free environment and gain confidence before making real investments.</Paragraph>
        <Quote>
          <p>We want to empower the next generation of investors to take control of their financial future</p>
          <Footer>- BetaTrade</Footer>
        </Quote>
      </Container>
    </Section>
  );
};

export default Motivation;
