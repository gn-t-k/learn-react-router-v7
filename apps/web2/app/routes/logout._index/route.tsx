import { href, redirect } from "react-router";
import { destroySession } from "../auth.google/session-helpers";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const headers = await destroySession(request);
	return redirect(href("/login"), { headers });
};
