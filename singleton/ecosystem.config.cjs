module.exports = {
	apps: [
		{
			name: "nest-singleton",
			script: "dist/main.mjs",
			env: {
				RUNNING_ENV: "prod",
			},
		},
	],
};
