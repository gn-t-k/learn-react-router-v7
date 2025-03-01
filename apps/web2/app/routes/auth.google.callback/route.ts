import { href, redirect } from "react-router";
import { authenticateByGoogle } from "../auth.google/authenticator.server";
import { saveSession } from "../auth.google/session-helpers";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await authenticateByGoogle(request);
	const headers = await saveSession(request, user);
	return redirect(href("/"), { headers });
};
