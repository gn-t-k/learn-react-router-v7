import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
	route("login", "routes/login._index/route.tsx"),
	layout("routes/users.$user_id/layout.tsx", [
		route("users/:user_id", "routes/users.$user_id._index/route.tsx"),
	]),
] satisfies RouteConfig;
