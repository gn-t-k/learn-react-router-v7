import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/_index/route.tsx"),
	route("auth/google", "routes/auth.google/route.ts"),
	route("auth/google/callback", "routes/auth.google.callback/route.ts"),
	route("login", "routes/login._index/route.tsx"),
	route("logout", "routes/logout._index/route.ts"),
	layout("routes/users.$user_id/layout.tsx", [
		route("users/:user_id", "routes/users.$user_id._index/route.tsx"),
	]),
] satisfies RouteConfig;
