import { databaseProvider } from "@packages/database";
import { Hono } from "hono";
import { contextStorage, getContext } from "hono/context-storage";
import { createRequestHandler } from "react-router";

// biome-ignore lint/style/useNamingConvention: hono
// biome-ignore lint/correctness/noUndeclaredVariables: <worker-configuration.d.ts
const app = new Hono<{ Bindings: Env }>();

app.use(contextStorage());

app.use(async (_c, next) => {
	if (!Object.getOwnPropertyDescriptor(globalThis.process, "env")?.get) {
		const processEnv = globalThis.process.env;
		Object.defineProperty(globalThis.process, "env", {
			get() {
				try {
					return { ...processEnv, ...getContext().env };
				} catch {
					return processEnv;
				}
			},
		});
	}
	return next();
});

app.use((c, next) => databaseProvider(c.env.db, next));

app.use(async (c) => {
	// @ts-expect-error - virtual module provided by React Router at build time
	const build = await import("virtual:react-router/server-build");
	const handler = createRequestHandler(build, import.meta.env.MODE);
	const result = await handler(c.req.raw);
	return result;
});

export default app;
