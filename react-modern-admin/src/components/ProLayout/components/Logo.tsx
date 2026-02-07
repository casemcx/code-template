import { IconSemiLogo } from '@douyinfe/semi-icons';
import { memo } from 'react';
import type { FC } from 'react';
import type { LogoProps } from '../types';

/**
 * Logo 组件
 * 支持自定义 Logo 和标题
 */
const Logo: FC<LogoProps> = memo(({ logo, title }) => {
  const renderLogo = () => {
    if (!logo) {
      return <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />;
    }

    if (typeof logo === 'function') {
      return logo();
    }

    return logo;
  };

  return (
    <div className="flex items-center gap-2 h-full">
      {renderLogo()}
      {title && (
        <h1 className="text-lg font-semibold text-semi-color-text-0 m-0 whitespace-nowrap">
          {title}
        </h1>
      )}
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
