import type { Permission } from '@/constants';
import type { UserInfo } from '@/types';
import { merge } from 'lodash-es';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { UserStore } from './types';

/**
 * 用户状态管理store
 * 使用zustand进行状态管理，并通过persist中间件实现本地缓存
 */
export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      /**
       * @description 用户信息
       */
      userInfo: undefined,
      token: undefined,
      isAuthenticated: false,
      loading: false,
      roles: [],
      permissions: [],

      /**
       * @description 设置用户信息
       */
      setUserInfo: (userInfo?: UserInfo) => {
        set({ userInfo });
      },

      /**
       * @description 设置token
       */
      setToken: (token?: string) => {
        set({ token, isAuthenticated: !!token });
      },

      /**
       * @description 更新用户信息
       */
      updateUserInfo: (updates: Partial<UserInfo>) => {
        const currentUserInfo = get().userInfo;
        if (currentUserInfo) {
          set({
            userInfo: merge(currentUserInfo, updates),
          });
        }
      },

      /**
       * @description 设置加载状态
       */
      setLoading: (loading: boolean) => {
        set({ loading });
      },

      /**
       * @description 设置角色
       */
      setRoles: (roles: string[]) => {
        set({ roles });
      },

      /**
       * @description 设置权限
       */
      setPermissions: (permissions: Permission[]) => {
        set({ permissions });
      },
    }),
    {
      name: 'user-storage', // 存储的key名称
      storage: createJSONStorage(() => localStorage), // 使用localStorage
      // 只持久化关键数据，loading状态不需要持久化
      partialize: state => ({
        userInfo: state.userInfo,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
