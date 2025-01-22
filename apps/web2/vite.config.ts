import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		rollupOptions: isSsrBuild
			? {
					input: "./workers/app.ts",
				}
			: undefined,
	},
	ssr: {
		target: "webworker",
		// noExternal: true,
		external: ["node:async_hooks"],
		resolve: {
			conditions: ["workerd", "browser"],
		},
		optimizeDeps: {
			include: [
				"react",
				"react/jsx-runtime",
				"react/jsx-dev-runtime",
				"react-dom",
				"react-dom/server",
				"react-router",
			],
		},
	},
	plugins: [
		// vitePluginViteNodeMiniflare({
		// 	entry: "./workers/app.ts",
		// 	miniflareOptions: (options) => {
		// 		options.compatibilityDate = "2024-11-18";
		// 		options.compatibilityFlags = ["nodejs_compat"];
		// 		options.d1Databases = { db: "58e2d047-3151-4e2f-9b25-a035c00c6296" };
		// 		// match where wrangler applies migrations to
		// 		options.d1Persist = "../../packages/database/.wrangler/state/v3/d1";
		// 	},
		// }),
		cloudflareDevProxy({
			getLoadContext: ({ context }) => {
				return {
					cloudflare: context.cloudflare,
				};
			},
		}),
		reactRouter(),
		tsconfigPaths(),
		vanillaExtractPlugin(),
	],
}));
