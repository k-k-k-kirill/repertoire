import React from "react";
import { Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./ModeSwitch.scss";

const { Title } = Typography;

interface ModeSwitchProps {
  openingId: string;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ openingId }) => {
  const location = useLocation();

  const isEditor = location.pathname.includes("edit");

  return (
    <div className="mode-switch">
      <Link
        className={`mode-switch__item ${
          isEditor ? "mode-switch__item--active" : ""
        }`}
        to={`/openings/edit`}
        state={{ branchId: openingId }}
      >
        <Title level={5}>Edit</Title>
      </Link>
      <Link
        className={`mode-switch__item ${
          !isEditor ? "mode-switch__item--active" : ""
        }`}
        to={`/openings/practice`}
        state={{ branchId: openingId }}
      >
        <Title level={5}>Practice</Title>
      </Link>
    </div>
  );
};

export default ModeSwitch;
