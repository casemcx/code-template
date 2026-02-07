import { clsx } from '@/utils';
import { IconCopy } from '@douyinfe/semi-icons';
import { Toast } from '@douyinfe/semi-ui';
import type { ReactNode } from 'react';

interface CopyableTextProps {
  /**
   * 要复制的文本
   */
  text: string;
  /**
   * 显示的内容
   */
  children: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 可复制文本组件
 */
const CopyableText = ({ text, children, className }: CopyableTextProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      Toast.success({ content: '复制成功' });
    } catch {
      Toast.error({ content: '复制失败' });
    }
  };

  return (
    <span className={clsx('inline-flex items-center gap-1', className)}>
      {children}
      <IconCopy
        className="cursor-pointer text-gray-400 hover:text-gray-600"
        size="small"
        onClick={handleCopy}
      />
    </span>
  );
};

export default CopyableText;
