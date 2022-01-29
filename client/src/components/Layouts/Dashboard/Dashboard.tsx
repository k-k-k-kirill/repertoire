import React from "react";
import { Layout, Typography } from "antd";
import "./Dashboard.scss";
import { ReactComponent as ChessIcon } from "../../../assets/chess-svgrepo-com.svg";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header>
          <Title className="layout__brand" level={4}>
            <ChessIcon className="layout__brand__icon" />
            <span className="layout__brand__title">Repertoire</span>
          </Title>
        </Header>
        <Content className="layout__content">
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
