import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/login._index/page.tsx"),
	layout("routes/users.$user_id/layout.tsx", [
		route("users/:user_id", "routes/users.$user_id._index/page.tsx"),
	]),
] satisfies RouteConfig;
