import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
