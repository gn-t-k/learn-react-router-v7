import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { tasks } from "./tasks";
import { userAuthenticatedEvents } from "./user-authenticated-events";

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email").notNull(),
	name: text("name").notNull(),
	locale: text("locale").notNull(),
	imageUrl: text("image_url").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	tasks: many(tasks),
	authenticatedEvents: many(userAuthenticatedEvents),
}));
