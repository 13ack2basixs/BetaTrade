import Features from "../components/Landing/Features";
import HowItWorks from "../components/Landing/HowItWorks";
import Motivation from "../components/Landing/Motivation";
import About from "../components/Landing/About";
import Intro from "../components/Landing/Intro";
import LandingHeader from "../components/Common/LandingHeader";
import AppLogo from "../components/Common/AppLogo";

const Landing = () => {
  return (
    <div>
      <AppLogo />
      <LandingHeader /> 
      <Intro />
      <Motivation />
      <Features />
      <HowItWorks />
      <About />
    </div>
  );
};

export default Landing;
