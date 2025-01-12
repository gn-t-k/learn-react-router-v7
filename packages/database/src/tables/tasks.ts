import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const tasks = sqliteTable("tasks", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	completed: integer({ mode: "boolean" }).notNull(),
	ownerId: text("owner_id").notNull(),
	createdAt: integer({ mode: "timestamp" }).notNull(),
	updatedAt: integer({ mode: "timestamp" }).notNull(),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
	owner: one(users, {
		fields: [tasks.ownerId],
		references: [users.id],
	}),
}));
