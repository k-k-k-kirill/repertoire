import React from "react";

// Styles
import "./OpeningCard.scss";

// Components
import { Card, Col, Typography } from "antd";

// Types
import { Opening } from "../../types/types";

const { Title } = Typography;

interface OpeningCardProps {
  opening: Opening;
}

const OpeningCard: React.FC<OpeningCardProps> = ({ opening }) => {
  return (
    <Col xs={{ span: 24 }} md={{ span: 8 }}>
      <Card>
        <Title className="opening-card__title" level={5}>
          {opening.title}
        </Title>
      </Card>
    </Col>
  );
};

export default OpeningCard;
