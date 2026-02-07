import { IconBell, IconExit, IconHelpCircle } from '@douyinfe/semi-icons';
import type { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';
import type { OnSelectedData } from '@douyinfe/semi-ui/lib/es/navigation';
import { useLocation, useNavigate } from '@modern-js/runtime/router';

import { type HeaderActionConfig, LangSwitch, ProLayout } from '@/components';
import { useLocale } from '@/locales';
import { useUserStore } from '@/stores/user';
import { userMenuItems } from './menu-items';

const AdminLayout = () => {
  const location = useLocation();
  const intl = useLocale();
  const navigate = useNavigate();

  // 使用用户状态管理
  const { userInfo, logout } = useUserStore();

  // 定义菜单项
  const { items: menuItems } = userMenuItems();

  // 菜单选择处理（使用 Semi 原生 OnSelectedData 类型）
  const handleMenuSelect = (data: OnSelectedData) => {
    navigate(data.itemKey as string);
  };

  // 登出处理
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Header 操作按钮配置
  const headerActions: HeaderActionConfig[] = [
    {
      key: 'notification',
      icon: <IconBell size="large" />,
      tooltip: intl.get('layout.notifications'),
    },
    {
      key: 'help',
      icon: <IconHelpCircle size="large" />,
      tooltip: intl.get('layout.help'),
    },
  ];

  // 头像下拉菜单配置（使用 Semi 原生 DropDownMenuItem 类型）
  const avatarDropdownMenu: DropDownMenuItem[] = [
    {
      node: 'item',
      name: intl.get('layout.profile'),
      onClick: () => navigate('/admin/profile'),
    },
    { node: 'divider' },
    {
      node: 'item',
      name: intl.get('layout.logout'),
      icon: <IconExit />,
      onClick: handleLogout,
    },
  ];

  return (
    <ProLayout
      title={intl.get('layout.menu.appName')}
      menuItems={menuItems}
      selectedKeys={[location.pathname]}
      onSelect={handleMenuSelect}
      headerRightContent={<LangSwitch />}
      headerActions={headerActions}
      avatarProps={{
        alt: userInfo?.nickName,
      }}
      avatarDropdownMenu={avatarDropdownMenu}
      onLogout={handleLogout}
    />
  );
};

export default AdminLayout;
