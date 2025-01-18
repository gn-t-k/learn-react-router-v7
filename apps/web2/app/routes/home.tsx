import { getDatabase } from "@packages/database";
import { tasks } from "@packages/database/src/tables/tasks";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	let title = formData.get("title");
	if (typeof title !== "string") {
		return { guestBookError: "Name and email are required" };
	}

	title = title.trim();
	if (!title) {
		return { guestBookError: "Name and email are required" };
	}

	const db = getDatabase();
	try {
		const now = new Date();
		await db.insert(tasks).values({
			id: `${now.valueOf()}`,
			title,
			completed: false,
			ownerId: "1",
			createdAt: now,
			updatedAt: now,
		});
	} catch (error) {
		return { guestBookError: "Error adding to guest book" };
	}
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = getDatabase();

	const data = await db.select({ title: tasks.title }).from(tasks);

	return {
		tasks: data,
	};
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
	return (
		<Welcome
			tasks={loaderData.tasks}
			guestBookError={actionData?.guestBookError}
		/>
	);
}
