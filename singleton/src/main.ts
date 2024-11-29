import { createApp } from './factory';

import { envConfig } from '@/config';

if (import.meta.env.PROD) {
	const app = await createApp();
	await app.listen(envConfig.SERVER_PORT);
	console.log(`${envConfig.NEST_APP_NAME} is running on port ${envConfig.SERVER_PORT}`);
}

export const viteNodeApp = createApp();
