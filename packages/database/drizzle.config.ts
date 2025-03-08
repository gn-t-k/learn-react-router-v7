import type { Config } from "drizzle-kit";
import invariant from "tiny-invariant";

const databaseId = process.env?.["CLOUDFLARE_DATABASE_ID"];
invariant(databaseId, "環境変数`CLOUDFLARE_DATABASE_ID`が設定されていません");

const accountId = process.env?.["CLOUDFLARE_ACCOUNT_ID"];
invariant(accountId, "環境変数`CLOUDFLARE_ACCOUNT_ID`が設定されていません");

const token = process.env?.["CLOUDFLARE_TOKEN"];
invariant(token, "環境変数`CLOUDFLARE_TOKEN`が設定されていません");

export default {
	out: "./migrations",
	schema: "./src/tables",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: { databaseId, accountId, token },
} satisfies Config;
