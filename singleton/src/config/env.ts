/**
 * 环境变量配置对象
 * 该对象用于集中管理前端项目中使用的后端服务器和微信相关配置
 */
export const envConfig = {
	/**
	 * 服务器端口
	 */
	SERVER_PORT: import.meta.env.VITE_SERVER_PORT,
	/**
	 * Nest应用名称
	 */
	NEST_APP_NAME: import.meta.env.VITE_NEST_APP_NAME,
};
