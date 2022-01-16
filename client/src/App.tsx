import React from "react";
import Login from "./views/Login";
import Openings from "./views/Openings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.less";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Openings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
