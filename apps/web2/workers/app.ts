import { createRequestHandler } from "react-router";

import { databaseProvider } from "@packages/database";

declare global {
	// biome-ignore lint/correctness/noUndeclaredVariables: worker-configuration.d.ts
	interface CloudflareEnvironment extends Env {
		// biome-ignore lint/correctness/noUndeclaredVariables: @cloudflare/workers-types
		db: D1Database;
	}
}

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: CloudflareEnvironment;
			// biome-ignore lint/correctness/noUndeclaredVariables: @cloudflare/workers-types
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	// @ts-expect-error - virtual module provided by React Router at build time
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	fetch: (request, env, ctx) => {
		return databaseProvider(env.db, () =>
			requestHandler(request, {
				cloudflare: { env, ctx },
			}),
		);
	},
	// biome-ignore lint/correctness/noUndeclaredVariables: @cloudflare/workers-types
} satisfies ExportedHandler<CloudflareEnvironment>;
