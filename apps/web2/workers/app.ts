import { createRequestHandler } from "react-router";

import { databaseProvider } from "@packages/database";

type CloudflareEnvironment = {
	// biome-ignore lint/correctness/noUndeclaredVariables: @cloudflare/workers-types
	db: D1Database;
};

declare module "react-router" {
	export interface AppLoadContext {
		// ここにcontextに渡したい値の型を定義
	}
}

const requestHandler = createRequestHandler(
	// @ts-expect-error - virtual module provided by React Router at build time
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	fetch(request, env) {
		return databaseProvider(env.db, () =>
			requestHandler(request, {
				// ここにcontextに渡したい値を定義
			}),
		);
	},
	// biome-ignore lint/correctness/noUndeclaredVariables: @cloudflare/workers-types
} satisfies ExportedHandler<CloudflareEnvironment>;
