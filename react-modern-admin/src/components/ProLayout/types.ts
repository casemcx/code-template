import type { AvatarProps } from '@douyinfe/semi-ui/lib/es/avatar/interface';
import type { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown';
import type {
  NavItems,
  NavProps,
  OnSelectedData,
} from '@douyinfe/semi-ui/lib/es/navigation';
import type {
  ItemKey,
  NavItemProps,
} from '@douyinfe/semi-ui/lib/es/navigation/Item';
import type { CSSProperties, ReactNode } from 'react';

// Re-export Semi types for convenience
export type {
  NavItems,
  NavProps,
  OnSelectedData,
  ItemKey,
  NavItemProps,
  DropDownMenuItem,
  AvatarProps,
};

/**
 * Header 操作按钮配置
 */
export type HeaderActionConfig = {
  /** 唯一标识 */
  key: string;
  /** 图标 */
  icon: ReactNode;
  /** 提示文字 */
  tooltip?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 徽标数 */
  badge?: number | boolean;
  /** 自定义渲染 */
  render?: () => ReactNode;
};

/**
 * ProLayout 主组件 Props
 * 使用 Pick 从 NavProps 提取导航相关属性，避免类型重复定义
 */
export type ProLayoutProps = Pick<
  NavProps,
  'selectedKeys' | 'defaultOpenKeys' | 'onSelect' | 'onCollapseChange'
> & {
  /** 子内容 */
  children?: ReactNode;
  /** 应用标题 */
  title?: string;
  /** Logo 配置 */
  logo?: ReactNode | (() => ReactNode);
  /** 菜单项配置（使用 Semi NavItems 类型） */
  menuItems?: NavItems;
  /** 侧边栏是否折叠 */
  collapsed?: boolean;
  /** 默认折叠状态 */
  defaultCollapsed?: boolean;
  /** 侧边栏宽度（展开时） */
  siderWidth?: number;
  /** Header 右侧内容 */
  headerRightContent?: ReactNode;
  /** Header 操作按钮配置 */
  headerActions?: HeaderActionConfig[];
  /** 用户头像配置（使用 Semi AvatarProps） */
  avatarProps?: AvatarProps;
  /** 头像下拉菜单配置（使用 Semi DropDownMenuItem 类型） */
  avatarDropdownMenu?: DropDownMenuItem[];
  /** 登出回调 */
  onLogout?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** Header 样式 */
  headerStyle?: CSSProperties;
  /** Sider 样式 */
  siderStyle?: CSSProperties;
  /** Content 样式 */
  contentStyle?: CSSProperties;
  /** 是否隐藏 Header */
  hideHeader?: boolean;
  /** 是否隐藏 Sider */
  hideSider?: boolean;
  /** Footer 内容 */
  footer?: ReactNode;
  /** Nav 组件额外属性（使用 Semi NavProps） */
  navProps?: Partial<NavProps>;
};

/**
 * Logo 组件 Props
 */
export type LogoProps = {
  /** Logo 配置 */
  logo?: ReactNode | (() => ReactNode);
  /** 应用标题 */
  title?: string;
};

/**
 * HeaderActions 组件 Props
 */
export type HeaderActionsProps = {
  /** 操作按钮配置 */
  actions?: HeaderActionConfig[];
};

/**
 * UserAvatar 组件 Props
 * 直接使用 Semi 的 AvatarProps 和 DropDownMenuItem
 */
export type UserAvatarProps = {
  /** 用户头像配置（直接使用 Semi AvatarProps） */
  avatarProps?: AvatarProps;
  /** 头像下拉菜单配置（直接使用 Semi DropDownMenuItem） */
  avatarDropdownMenu?: DropDownMenuItem[];
  /** 登出回调 */
  onLogout?: () => void;
};
