import React from "react";
import { Card, Typography } from "antd";

interface NonInteractiveHistoryProps {
  history: string[];
  title: string;
}

const { Title } = Typography;

const NonInteractiveHistory: React.FC<NonInteractiveHistoryProps> = ({
  history,
  title,
}) => {
  return (
    <Card className="history">
      <Title level={5}>{title}</Title>

      {history.map((item, index) => (
        <div
          className={`history__move ${
            (index + 1) % 2 > 0 ? "" : "history__move--black"
          }`}
          key={item}
        >
          <span>
            {index + 1}. {item}
          </span>
        </div>
      ))}
    </Card>
  );
};

export default NonInteractiveHistory;
