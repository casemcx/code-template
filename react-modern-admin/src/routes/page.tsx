import { useUserStore } from '@/stores/user/hook';
import { useNavigate } from '@modern-js/runtime/router';
import { useEffect } from 'react';

/**
 * 根路径重定向组件
 * 根据用户登录状态自动重定向到相应页面
 */
export default function IndexPage() {
  const navigate = useNavigate();
  const { token } = useUserStore();

  useEffect(() => {
    // 判断是否已登录
    if (token) {
      // 已登录，重定向到 dashboard
      navigate('/dashboard', { replace: true });
    } else {
      // 未登录，重定向到 login
      // navigate('/login', { replace: true });
      navigate('/dashboard', { replace: true });
    }
  }, [token, navigate]);

  // 重定向过程中显示空白页面或加载状态
  return null;
}
