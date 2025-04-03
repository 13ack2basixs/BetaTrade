import Features from "../components/Landing/Features";
import HowItWorks from "../components/Landing/HowItWorks";
import Motivation from "../components/Landing/Motivation";
import About from "../components/Landing/About";
import Intro from "../components/Landing/Intro";
import LoginButton from "../components/Landing/LoginButton";
import LandingNavBar from "../components/Common/LandingNavBar";
import AppLogo from "../components/Common/AppLogo";
import LandingLayout from "../layout/LandingLayout";

const Landing = () => {
  return (
    <LandingLayout>
      <AppLogo />
      <LandingNavBar /> 
      <LoginButton />
      <Intro />
      <Motivation />
      <Features />
      <HowItWorks />
      <About />
    </LandingLayout>
  );
};

export default Landing;
