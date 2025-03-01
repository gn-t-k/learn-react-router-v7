import { type Session, createCookieSessionStorage } from "react-router";
import invariant from "tiny-invariant";
import type { SessionUser } from "./session-user";

const sessionSecret = process.env["SESSION_SECRET"];
const nodeEnv = process.env["NODE_ENV"];
invariant(sessionSecret, "環境変数`SESSION_SECRET`が設定されていません");
invariant(nodeEnv, "環境変数`NODE_ENV`が設定されていません");

type SessionStorage = { user: SessionUser };
const sessionStorage = createCookieSessionStorage<SessionStorage>({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [sessionSecret],
		secure: nodeEnv === "production",
	},
});

type GetSession = (
	request: Request,
) => Promise<Session<SessionStorage, SessionStorage>>;
export const getSession: GetSession = async (request) => {
	return await sessionStorage.getSession(request.headers.get("Cookie"));
};

type SaveSession = (request: Request, user: SessionUser) => Promise<Headers>;
export const saveSession: SaveSession = async (request, user) => {
	const session = await getSession(request);
	session.set("user", user);

	return new Headers({
		"Set-Cookie": await sessionStorage.commitSession(session),
	});
};

type DestroySession = (request: Request) => Promise<Headers>;
export const destroySession: DestroySession = async (request) => {
	const session = await getSession(request);

	return new Headers({
		"Set-Cookie": await sessionStorage.destroySession(session),
	});
};
