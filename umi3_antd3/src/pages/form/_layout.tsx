import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, history } from 'umi';
import styles from './layout.less';

const { Sider, Content } = Layout;

const FormLayout: React.FC = (props) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { key: '/form/basic', label: '基础表单' },
    { key: '/form/advanced', label: '高级表单' },
    { key: '/form/dynamic', label: '动态表单' },
    { key: '/form/validation', label: '表单验证' },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    history.push(key);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ant Design 表单示例集</h1>
      <Layout className={styles.layout}>
        <Sider width={250} className={styles.sider}>
          <Menu
            mode="inline"
            selectedKeys={[currentPath]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={handleMenuClick}
          >
            <Menu.Item key="/form/basic">基础表单</Menu.Item>
            <Menu.Item key="/form/advanced">高级表单</Menu.Item>
            <Menu.Item key="/form/dynamic">动态表单</Menu.Item>
            <Menu.Item key="/form/validation">表单验证</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className={styles.content}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default FormLayout;
