import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import { ThemeProvider } from "@packages/styles";
import type { FC, PropsWithChildren } from "react";
import type { Route } from "./+types/root.ts";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
};

const App: FC = () => {
	return <Outlet />;
};
export default App;

export const ErrorBoundary: FC<Route.ErrorBoundaryProps> = ({ error }) => {
	const { message, details, stack } = (() => {
		if (isRouteErrorResponse(error)) {
			return error.status === 404
				? {
						message: "404",
						details: "The requested page could not be found.",
						stack: undefined,
					}
				: {
						message: "Error",
						details: error.statusText || "An unexpected error occurred.",
						stack: undefined,
					};
		}

		const isDev = import.meta.env.DEV;
		if (isDev && error && error instanceof Error) {
			return {
				message: "Oops!",
				details: error.message,
				stack: error.stack,
			};
		}

		return {
			message: "Oops!",
			details: "An unexpected error occurred.",
			stack: undefined,
		};
	})();

	return (
		<main>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
};
