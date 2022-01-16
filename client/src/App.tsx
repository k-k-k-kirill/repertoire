import React from "react";
import Login from "./views/Login";
import Openings from "./views/Openings";
import Welcome from "./views/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.less";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Openings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
