import React from "react";

// Components
import { Row } from "antd";

// Types
import { Opening } from "../../types/types";
import OpeningCard from "../OpeningCard/OpeningCard";

interface OpeningListProps {
  openings: Opening[];
}

const OpeningList: React.FC<OpeningListProps> = ({ openings }) => {
  return (
    <Row gutter={16}>
      {openings.map((opening) => (
        <OpeningCard opening={opening} />
      ))}
    </Row>
  );
};

export default OpeningList;
