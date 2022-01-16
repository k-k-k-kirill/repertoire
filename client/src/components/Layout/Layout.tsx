import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import "./Layout.scss";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const LayoutWrapper: React.FC = ({ children }) => {
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  const toggleDrawerCollapsed = () => setDrawerCollapsed(!drawerCollapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={drawerCollapsed}
        onCollapse={toggleDrawerCollapsed}
      >
        <Title className="layout__brand" level={3}>
          Repertoire
        </Title>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Openings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header />
        <Content className="layout__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
