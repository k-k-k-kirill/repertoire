import React from "react";
import { Row, Col } from "antd";
import "./FiftyFifty.scss";

const FiftyFifty: React.FC = ({ children }) => {
  return (
    <Row className="fifty-fifty-layout__container" align="middle">
      <Col
        span={12}
        xs={{
          offset: 0,
          span: 24,
        }}
        lg={{
          offset: 12,
          span: 12,
        }}
      >
        <Row>
          <Col offset={6} span={12}>
            {children}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FiftyFifty;
