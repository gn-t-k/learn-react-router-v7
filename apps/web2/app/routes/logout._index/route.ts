import { redirectToSearchParams } from "app/features/auth/redirect-manager";
import { destroySession } from "app/features/auth/user-session-manager.server";
import { href, redirect } from "react-router";
import type { Route } from "./+types/route";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get(redirectToSearchParams) || "/";
	const params = new URLSearchParams({
		[redirectToSearchParams]: redirectTo,
	}).toString();

	const headers = await destroySession(request);

	return redirect(`${href("/login")}?${params}`, { headers });
};
