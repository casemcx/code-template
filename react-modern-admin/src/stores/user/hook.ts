import { doLogin, getUserInfo } from '@/api';
import { ResultCode } from '@/constants';
import type { LoginDto } from '@/types';
import { userStore as zustandUserStore } from './store';

export const useUserStore = () => {
  const userStore = zustandUserStore();

  /**
   * @description 登录
   * @param loginDto LoginDto
   * @returns Promise<void>
   */
  const login = async (loginDto: LoginDto) => {
    const response = await doLogin(loginDto);
    userStore.setLoading(true);
    try {
      if (response.code === ResultCode.SUCCESS) {
        const token = response.data;

        userStore.setToken(token);

        // 获取角色和权限
        const result = await getUserInfo();
        if (result.code === ResultCode.SUCCESS) {
          userStore.setUserInfo(result.data);
          userStore.setRoles(result.data.roles);
          userStore.setPermissions(result.data.permissions);
        } else {
          return Promise.reject(result.msg);
        }
      } else {
        return Promise.reject(response.msg);
      }
    } finally {
      userStore.setLoading(false);
    }
  };

  /**
   * @description 退出登录
   * @returns Promise<void>
   */
  const logout = () => {
    userStore.setUserInfo();
    userStore.setToken();
    userStore.setRoles([]);
    userStore.setPermissions([]);
    userStore.setLoading(false);
  };

  return {
    ...userStore,
    login,
    logout,
  };
};
