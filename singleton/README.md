# nestjs-demo

## 編譯依賴
本项目启动依赖docker 和 docker-compose



## 部署
1. 修改env文件 ```mv .env.sample .env```

	1.1 ```mv .env.sample .env```

	1.2 修改配置文件
	| 键值                           | 备注                     |
	|--------------------------------|-------------------------|
	| VITE_JENKINS_URL               | Jenkins 地址             |
	| VITE_JENKINS_USER              | Jenkins 用户名需要管理员   |
	| VITE_JENKINS_PASSWORD          | Jenkins 用户密码          |
2. 构建

	2.1 ```cd docker```
	
	2.2 ```docker-compose up -d```
