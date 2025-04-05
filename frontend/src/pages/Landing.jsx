import Features from "../components/Landing/Features";
import HowItWorks from "../components/Landing/HowItWorks";
import Motivation from "../components/Landing/Motivation";
import About from "../components/Landing/About";
import Intro from "../components/Landing/Intro";
import LandingHeader from "../components/Common/LandingHeader";
import LandingLayout from "../layout/LandingLayout";

const Landing = () => {
  return (
    <LandingLayout>
      <LandingHeader /> 
      <Intro />
      <Motivation />
      <Features />
      <HowItWorks />
      <About />
    </LandingLayout>
  );
};

export default Landing;
