import React from "react";
import "./OpeningCard.scss";
import { Col, Typography } from "antd";
import { Branch } from "../../types/types";
import PlaceholderImage from "../../assets/25643.jpg";
import { Link } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import withConfirmationDialog from "../../hoc/withConfirmationDialog";
import { useDispatch } from "react-redux";
import { uiDeleteBranch } from "../../redux/branches/slice";

const { Title } = Typography;

interface OpeningCardProps {
  opening: Branch;
  confirmAction: any;
}

const OpeningCard: React.FC<OpeningCardProps> = ({
  opening,
  confirmAction,
}) => {
  const dispatch = useDispatch();

  const onOpeningDeleteClick = (opening: Branch) => {
    if (opening._id) {
      confirmAction(
        `Remove opening ${opening.title}`,
        `Are you sure you want to remove opening ${opening.title}?`,
        () => dispatch(uiDeleteBranch(opening._id || ""))
      );
    }
  };

  return (
    <Col xs={{ span: 12 }}>
      <div className="opening-card">
        <Link
          to={`/openings/edit`}
          state={{ branchId: opening._id }}
          className="opening-card"
        >
          <div className="opening-card__content">
            <img className="opening-card__image" src={PlaceholderImage} />
            <Title className="opening-card__title" level={5}>
              {opening.title}
            </Title>
          </div>
        </Link>
        <CloseCircleOutlined
          onClick={() => onOpeningDeleteClick(opening)}
          style={{ fontSize: "120%" }}
        />
      </div>
    </Col>
  );
};

export default withConfirmationDialog(OpeningCard);
