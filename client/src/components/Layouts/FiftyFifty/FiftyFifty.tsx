import React from "react";
import { Row, Col } from "antd";
import "./FiftyFifty.scss";
import Illustration from "../../../assets/chess.jpg";

const FiftyFifty: React.FC = ({ children }) => {
  return (
    <Row className="fifty-fifty-layout__container" align="middle">
      <Col xs={{ span: 24 }} lg={{ span: 12 }}>
        <img
          alt="Repertoire illustration"
          className="fifty-fifty-layout__illustration"
          src={Illustration}
        />
      </Col>
      <Col
        span={12}
        xs={{
          span: 24,
        }}
        lg={{
          span: 12,
        }}
      >
        <Row>
          <Col xs={{ offset: 1, span: 22 }} lg={{ offset: 6, span: 12 }}>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FiftyFifty;
