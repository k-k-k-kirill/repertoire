import React from "react";

// Styles
import "./History.scss";

// Components
import { Card, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

interface HistoryProps {
  history: string[];
  title: string;
  onUndo: () => void;
}

const { Title } = Typography;

const History: React.FC<HistoryProps> = ({ history, title, onUndo }) => {
  return (
    <Card className="history">
      <Title level={5}>{title}</Title>
      {history.map((item, index) => (
        <div className="history__move" key={item}>
          <span>{item}</span>
          {index === history.length - 1 && (
            <CloseCircleOutlined onClick={onUndo} />
          )}
        </div>
      ))}
    </Card>
  );
};

export default History;
