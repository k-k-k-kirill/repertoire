import React, { useEffect } from "react";
import { connect } from "react-redux";
import Login from "./views/Login";
import Openings from "./views/Openings/Openings";
import OpeningEditor from "./views/OpeningEditor/OpeningEditor";
import OpeningPractice from "./views/OpeningPractice/OpeningPractice";
import { Routes, Route, useNavigate } from "react-router-dom";

// Styles
import "./App.less";
import "./styles/main.scss";
import Signup from "./views/Signup";
import { getIsAuthenticated } from "./redux/session/slice";

interface AppStateProps {
  isAuthenticated: boolean;
}

const App: React.FC<AppStateProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/openings" element={<Openings />} />
      <Route path="/openings/add" element={<OpeningEditor />} />
      <Route path="/openings/edit" element={<OpeningEditor />} />
      <Route path="/openings/practice" element={<OpeningPractice />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(App);
