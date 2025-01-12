import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tasks } from "./tasks";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	imageUrl: text("image_url").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	tasks: many(tasks),
}));
