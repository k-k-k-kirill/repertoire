import React from "react";
import { Layout, Typography } from "antd";
import "./Dashboard.scss";
import { ReactComponent as ChessIcon } from "../../../assets/chess-svgrepo-com.svg";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Link to="/openings">
          <Title className="layout__brand" level={4}>
            <ChessIcon className="layout__brand__icon" />
            <span className="layout__brand__title">Repertoire</span>
          </Title>
        </Link>
      </Header>
      <Content className="layout__content">
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
