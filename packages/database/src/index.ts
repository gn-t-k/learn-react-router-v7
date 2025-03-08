import { AsyncLocalStorage } from "node:async_hooks";
import { drizzle } from "drizzle-orm/d1";
import type { AnyD1Database, DrizzleD1Database } from "drizzle-orm/d1";
import { schema } from "./schema";

export * from "drizzle-orm";

export * from "./schema";

type Database = DrizzleD1Database<typeof schema>;
const storage = new AsyncLocalStorage<Database>();

export const databaseProvider = <T>(
	database: AnyD1Database,
	callback: () => T,
): T => {
	return storage.run(drizzle(database, { schema }), callback);
};

export const getDatabase = (): Database => {
	const database = storage.getStore();
	if (!database) {
		throw new Error("Database not provided");
	}
	return database;
};
