import React from "react";
import Login from "./views/Login";
import Openings from "./views/Openings/Openings";
import OpeningEditor from "./views/OpeningEditor/OpeningEditor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./App.less";
import "./styles/main.scss";
import Signup from "./views/Signup";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/openings" element={<Openings />} />
        <Route path="/openings/:id" element={<OpeningEditor />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
