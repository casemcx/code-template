import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const createApp = async () => {
	const app = await NestFactory.create(AppModule);

	// 跨域
	app.enableCors({
		origin: true,
		methods: 'GET,PUT,POST',
		allowedHeaders: 'Content-Type,Authorization',
		exposedHeaders: 'Content-Range,X-Content-Range',
		credentials: true,
		maxAge: 3600,
	});

	app.setGlobalPrefix('/api');

	// 启动全局字段校验，保证请求接口字段校验正确。
	app.useGlobalPipes(new ValidationPipe());

	return app;
};
