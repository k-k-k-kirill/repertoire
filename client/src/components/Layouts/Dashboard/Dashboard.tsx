import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import "./Dashboard.scss";
import { ReactComponent as ChessIcon } from "../../../assets/chess-svgrepo-com.svg";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = ({ children }) => {
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  const toggleDrawerCollapsed = () => setDrawerCollapsed(!drawerCollapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={drawerCollapsed}
        onCollapse={toggleDrawerCollapsed}
      >
        <Title className="layout__brand" level={4}>
          <ChessIcon
            className={`${!drawerCollapsed ? "layout__brand__icon" : ""}`}
          />
          <span
            className={`layout__brand__title ${
              drawerCollapsed ? "layout__brand__title--minimized" : ""
            }`}
          >
            Repertoire
          </span>
        </Title>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Openings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content className="layout__content">
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
