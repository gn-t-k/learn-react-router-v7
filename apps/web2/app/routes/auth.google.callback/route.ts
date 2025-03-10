import { authenticateByGoogle } from "app/features/auth/authenticator.server";
import { getRedirectTo } from "app/features/auth/redirect-manager";
import { saveSession } from "app/features/auth/user-session-manager.server";
import { redirect } from "react-router";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const user = await authenticateByGoogle(request);

	const headers = await saveSession(request)(user);
	const href = await getRedirectTo(request);

	return redirect(href ?? "/", { headers });
};
