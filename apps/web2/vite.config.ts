import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const entry = "./workers/app.ts";

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		rollupOptions: {
			input: isSsrBuild ? entry : undefined,
		},
	},
	// ssr: {
	// 	target: "webworker",
	// 	noExternal: true,
	// 	external: ["node:async_hooks"],
	// 	resolve: {
	// 		conditions: ["workerd", "browser"],
	// 	},
	// 	optimizeDeps: {
	// 		include: [
	// 			"react",
	// 			"react/jsx-runtime",
	// 			"react/jsx-dev-runtime",
	// 			"react-dom",
	// 			"react-dom/server",
	// 			"react-router",
	// 		],
	// 	},
	// },
	ssr: {
		resolve: {
			conditions: ["workerd", "worker", "browser"],
			externalConditions: ["workerd", "worker"],
		},
	},
	resolve: {
		mainFields: ["browser", "module", "main"],
	},
	plugins: [
		reactRouter(),
		// cloudflareDevProxy({
		// 	getLoadContext: ({ context }) => {
		// 		return {
		// 			cloudflare: context.cloudflare,
		// 		};
		// 	},
		// }),
		serverAdapter({
			adapter,
			entry,
		}),
		tsconfigPaths(),
		vanillaExtractPlugin(),
	],
}));
