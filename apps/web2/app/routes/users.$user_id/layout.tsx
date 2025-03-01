import { type FC, use } from "react";
import { Link, Outlet, href } from "react-router";
import { getSessionUser } from "../auth.google/session-helpers";
import type { SessionUser } from "../auth.google/session-user";
import type { Route } from "./+types/layout";

export const loader = ({ request }: Route.LoaderArgs) => {
	const user = getSessionUser(request);

	return { user };
};

const Layout: FC<Route.ComponentProps> = ({ loaderData }) => {
	return <Outlet />;
};
export default Layout;

type LogoutButtonProps = {
	userPromise: Promise<SessionUser | undefined>;
};
const logoutButton: FC<LogoutButtonProps> = ({ userPromise }) => {
	const user = use(userPromise);

	if (user === undefined) {
		return null;
	}

	return <Link to={href("/logout")}>ログアウト</Link>;
};
