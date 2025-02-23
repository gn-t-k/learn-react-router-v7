import { createCookieSessionStorage } from "react-router";
import invariant from "tiny-invariant";
import type { SessionUser } from "./authenticator.server";

const sessionSecret = process.env["SESSION_SECRET"];
const nodeEnv = process.env["NODE_ENV"];
invariant(sessionSecret, "環境変数`SESSION_SECRET`が設定されていません");
invariant(nodeEnv, "環境変数`NODE_ENV`が設定されていません");

const SESSION_KEY = "user";

export const sessionStorage = createCookieSessionStorage<{
	[SESSION_KEY]: SessionUser;
}>({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [sessionSecret],
		secure: nodeEnv === "production",
	},
});

export const getSession = async (request: Request) => {
	return await sessionStorage.getSession(request.headers.get("Cookie"));
};

type SaveSession = (request: Request, user: SessionUser) => Promise<Headers>;
export const saveSession: SaveSession = async (request, user) => {
	const session = await getSession(request);
	session.set(SESSION_KEY, user);

	return new Headers({
		"Set-Cookie": await sessionStorage.commitSession(session),
	});
};
