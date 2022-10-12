import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Typography, Button } from "antd";
import { Branch } from "../../types/types";
import OpeningCard from "../OpeningCard/OpeningCard";
import "./OpeningList.scss";
import { Link } from "react-router-dom";
import { uiClearCurrentBranch } from "../../redux/branches/slice";

const { Title } = Typography;

interface OpeningListProps {
  openings: Branch[];
}

const OpeningList: React.FC<OpeningListProps> = ({ openings }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uiClearCurrentBranch());
  }, []);

  return (
    <>
      <div className="opening-list__top">
        <Title level={2}>Your openings</Title>
        <Button size="large" type="primary">
          <Link to="/openings/add" state={{ new: true }}>
            Add new
          </Link>
        </Button>
      </div>
      <Row gutter={16}>
        {openings.map((opening) => (
          <OpeningCard key={`opening-${opening._id}`} opening={opening} />
        ))}
      </Row>
    </>
  );
};

export default OpeningList;
