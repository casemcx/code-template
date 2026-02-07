import { useLocale } from '@/locales';
import { IconExit } from '@douyinfe/semi-icons';
import { Avatar, Dropdown, Modal } from '@douyinfe/semi-ui';
import type { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';
import { memo, useCallback, useMemo } from 'react';
import type { FC } from 'react';
import type { UserAvatarProps } from '../types';

/**
 * 用户头像下拉菜单组件
 * 直接使用 Semi AvatarProps 和 DropDownMenuItem
 */
const UserAvatar: FC<UserAvatarProps> = memo(
  ({ avatarProps, avatarDropdownMenu, onLogout }) => {
    const intl = useLocale();

    // 处理登出
    const handleLogout = useCallback(() => {
      Modal.confirm({
        title: intl.get('layout.logoutConfirm'),
        content: intl.get('layout.logoutConfirmMessage'),
        onOk: () => {
          onLogout?.();
        },
      });
    }, [intl, onLogout]);

    // 构建下拉菜单（使用 Semi 的 DropDownMenuItem 类型）
    const dropdownMenu = useMemo<DropDownMenuItem[]>(() => {
      // 如果提供了自定义菜单，直接使用
      if (avatarDropdownMenu && avatarDropdownMenu.length > 0) {
        return avatarDropdownMenu;
      }

      // 默认菜单
      return [
        {
          node: 'item',
          name: intl.get('layout.profile'),
        },
        { node: 'divider' },
        {
          node: 'item',
          name: intl.get('layout.logout'),
          icon: <IconExit />,
          onClick: handleLogout,
        },
      ];
    }, [avatarDropdownMenu, intl, handleLogout]);

    return (
      <Dropdown trigger="click" position="bottomRight" menu={dropdownMenu}>
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-semi-color-fill-0 transition-colors">
          <Avatar color="orange" size="small" {...avatarProps} />
        </div>
      </Dropdown>
    );
  },
);

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
