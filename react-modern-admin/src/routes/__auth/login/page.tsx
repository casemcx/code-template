import { useUserStore } from '@/stores/user/hook';
import type { LoginDto } from '@/types';
import { Button, Form, Toast } from '@douyinfe/semi-ui';
import { useNavigate } from '@modern-js/runtime/router';
import { useState } from 'react';

/**
 * 登录页面
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginDto) => {
    setLoading(true);
    try {
      await login(values);
      Toast.success('登录成功');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      Toast.error(error instanceof Error ? error.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">登录</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            field="username"
            label="用户名"
            placeholder="请输入用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          />
          <Form.Input
            field="password"
            label="密码"
            type="password"
            placeholder="请输入密码"
            rules={[{ required: true, message: '请输入密码' }]}
          />
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="mt-4"
          >
            登录
          </Button>
        </Form>
      </div>
    </div>
  );
}
