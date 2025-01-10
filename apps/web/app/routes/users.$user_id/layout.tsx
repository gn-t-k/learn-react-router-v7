import type { FC } from "react";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

const Layout: FC<Route.ComponentProps> = () => {
	return <Outlet />;
};
export default Layout;
