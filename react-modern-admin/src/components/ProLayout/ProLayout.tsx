import { useControllableValue } from '@/hooks';
import { clsx } from '@/utils/classnames';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { Outlet } from '@modern-js/runtime/router';
import { memo } from 'react';
import type { FC } from 'react';
import HeaderActions from './components/HeaderActions';
import Logo from './components/Logo';
import UserAvatar from './components/UserAvatar';
import styles from './styles/index.module.less';
import type { ProLayoutProps } from './types';

const { Header, Sider, Content } = Layout;

/**
 * ProLayout 主组件
 * 企业级后台布局组件，包含 Header、Sider、Content 三栏结构
 */
const ProLayout: FC<ProLayoutProps> = memo(
  ({
    children,
    title,
    logo,
    menuItems,
    selectedKeys = [],
    defaultOpenKeys,
    onSelect,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapseChange,
    siderWidth = 220,
    headerRightContent,
    headerActions,
    avatarProps,
    avatarDropdownMenu,
    onLogout,
    className,
    style,
    headerStyle,
    siderStyle,
    contentStyle,
    hideHeader = false,
    hideSider = false,
    footer,
    navProps,
  }) => {
    // 管理折叠状态（支持受控与非受控）
    const [collapsed, setCollapsed] = useControllableValue<boolean>({
      value: collapsedProp,
      defaultValue: defaultCollapsed,
      onChange: onCollapseChange,
    });

    return (
      <Layout
        className={clsx(
          styles['pro-layout'],
          'w-full h-screen flex flex-col',
          className,
        )}
        style={style}
      >
        {/* Header */}
        {!hideHeader && (
          <Header style={headerStyle}>
            <Nav mode="horizontal">
              <Nav.Header>
                <Logo logo={logo} title={title} />
              </Nav.Header>
              <Nav.Footer>
                <div className="flex items-center gap-2 pr-4">
                  {headerRightContent}
                  <HeaderActions actions={headerActions} />
                  <UserAvatar
                    avatarProps={avatarProps}
                    avatarDropdownMenu={avatarDropdownMenu}
                    onLogout={onLogout}
                  />
                </div>
              </Nav.Footer>
            </Nav>
          </Header>
        )}

        {/* Main Layout (Sider + Content) */}
        <Layout>
          {/* Sider */}
          {!hideSider && (
            <Sider style={siderStyle} className="flex">
              <Nav
                items={menuItems}
                style={{ maxWidth: siderWidth, height: '100%' }}
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                onSelect={onSelect}
                isCollapsed={collapsed}
                onCollapseChange={setCollapsed}
                footer={{
                  collapseButton: true,
                }}
                {...navProps}
                className="h-full"
              />
            </Sider>
          )}

          {/* Content */}
          <Content style={contentStyle} className="p-4 overflow-auto h-full">
            {children ?? <Outlet />}
          </Content>
        </Layout>

        {/* Footer */}
        {footer && (
          <div className="p-4 text-center bg-semi-color-bg-1 border-t border-semi-color-border">
            {footer}
          </div>
        )}
      </Layout>
    );
  },
);

ProLayout.displayName = 'ProLayout';

export default ProLayout;
