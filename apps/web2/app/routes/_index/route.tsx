import { getDatabase } from "@packages/database";
import { tasks } from "@packages/database/src/tables/tasks";
import type { FC } from "react";
import type { Route } from "./+types/route";

export const loader = async (_: Route.LoaderArgs) => {
	const db = getDatabase();
	const data = await db
		.select({ id: tasks.id, title: tasks.title })
		.from(tasks);

	return {
		tasks: data,
	};
};

export const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
	return (
		<ul>
			{loaderData.tasks.map((task) => (
				<li key={task.id}>{task.title}</li>
			))}
		</ul>
	);
};
export default Page;
