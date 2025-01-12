import type { AnyTable, Relations } from "drizzle-orm";
import { tasks, tasksRelations } from "./tables/tasks";
import { users, usersRelations } from "./tables/users";

export const schema = {
	users,
	usersRelations,
	tasks,
	tasksRelations,
} satisfies Record<string, AnyTable<NonNullable<unknown>> | Relations>;
