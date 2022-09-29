import React from "react";
import "./OpeningCard.scss";
import { Col, Typography } from "antd";
import { Branch } from "../../types/types";
import PlaceholderImage from "../../assets/25643.jpg";
import { Link } from "react-router-dom";

const { Title } = Typography;

interface OpeningCardProps {
  opening: Branch;
}

const OpeningCard: React.FC<OpeningCardProps> = ({ opening }) => {
  return (
    <Col xs={{ span: 12 }}>
      <Link
        to={`/openings/edit`}
        state={{ branchId: opening._id }}
        className="opening-card"
      >
        <img className="opening-card__image" src={PlaceholderImage} />
        <Title className="opening-card__title" level={5}>
          {opening.title}
        </Title>
      </Link>
    </Col>
  );
};

export default OpeningCard;
