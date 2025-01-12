import type { Config } from "drizzle-kit";

export default {
	out: "./drizzle",
	schema: "./src/tables",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		databaseId: "58e2d047-3151-4e2f-9b25-a035c00c6296",
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		accountId: process.env?.["CLOUDFLARE_ACCOUNT_ID"]!,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		token: process.env?.["CLOUDFLARE_TOKEN"]!,
	},
} satisfies Config;
