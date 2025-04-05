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
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #666666;
  line-height: 1.8;
`;

const About = () => {
  return (
    <Section id="about">
      <Container>
        <Heading>About Us</Heading>
        <Description>This app started as a summer project, and like many others, I initially thought I would set it aside to focus on other things. However, there was something about this idea that I could not let go of. It quickly became clear that I was truly passionate about it, and I knew I could not just leave it on the sidelines</Description>
        {/* <div className="team">
          <div className="member">
            <h3>Hong Wei</h3>
            <p>Just an undergraduate student, nothing interesting</p>
          </div>
        </div> */}
      </Container>
    </Section>
  );
};

export default About;
