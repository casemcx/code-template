import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		server: {
			port: Number(env.VITE_SERVER_PORT),
			host: true,
		},
		plugins: [
			...VitePluginNode({
				adapter: "nest",
				appPath: "./src/main.ts",
				tsCompiler: "swc",
				outputFormat: "es",
			}),
		],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				"@templates": path.resolve(__dirname, "templates"),
			},
		},
		build: {
			outDir: "dist",
		},
		optimizeDeps: {
			exclude: [
				"@nestjs/microservices",
				"@nestjs/websockets",
				"cache-manager",
				"class-transformer",
				"class-validator",
				"fastify-swagger",
			],
		},
	};
});
