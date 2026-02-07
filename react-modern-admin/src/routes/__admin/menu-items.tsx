import DashboardSvg from '@/assets/icon/menu/dashboard.svg?react';
import { useLocale } from '@/locales';
import {
  IconList,
  IconLock,
  IconSetting,
  IconUser,
  IconUserGroup,
} from '@douyinfe/semi-icons';
import { Icon } from '@douyinfe/semi-ui';

export const userMenuItems = () => {
  const intl = useLocale();

  const items = useMemo(
    () => [
      {
        itemKey: 'dashboard',
        text: intl.get('layout.menu.dashboard'),
        icon: (
          <Icon size="small" svg={<DashboardSvg width={20} height={20} />} />
        ),
      },
      {
        itemKey: '/user',
        text: intl.get('layout.menu.user'),
        icon: <IconUser />,
        items: [
          {
            itemKey: '/user/user-list',
            text: intl.get('layout.menu.user.list'),
            icon: <IconList />,
          },
          {
            itemKey: '/user/role',
            text: intl.get('layout.menu.user.roleManage'),
            icon: <IconUserGroup />,
          },
          {
            itemKey: '/user/permission',
            text: intl.get('layout.menu.user.permission'),
            icon: <IconLock />,
          },
          {
            itemKey: '/user/user-role',
            text: intl.get('layout.menu.user.userRole'),
            icon: <IconUserGroup />,
          },
          {
            itemKey: '/user/role-permission',
            text: intl.get('layout.menu.user.rolePermission'),
            icon: <IconSetting />,
          },
        ],
      },
    ],
    [intl],
  );

  return {
    items,
  };
};
