import React from "react";
import Navbar from "../components/common/Navbar";

const LandingLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/* Footer or other common sections can go here */}
    </div>
  );
};

export default LandingLayout;
