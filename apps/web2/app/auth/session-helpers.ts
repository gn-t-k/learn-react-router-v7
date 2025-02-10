import { GoogleStrategy } from "@coji/remix-auth-google";
import { createCookieSessionStorage } from "react-router";
import { Authenticator } from "remix-auth";

export type SessionUser = {
	id: string;
	email: string;
	displayName: string;
	pictureUrl: string;
};

const sessionSecret = process.env.SESSION_SECRET;
if (sessionSecret === undefined) {
	throw new Error("環境変数SESSION_SECRETが設定されていません");
}

const sessionKey = "user";
export const sessionStorage = createCookieSessionStorage<{
	[sessionKey]: SessionUser;
}>({
	cookie: {
		name: "__session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [sessionSecret],
		secure: process.env.NODE_ENV === "production",
	},
});

export const getSession = async (request: Request) => {
	return await sessionStorage.getSession(request.headers.get("Cookie"));
};

export const getSessionUser = async (request: Request) => {
	const session = await getSession(request);
	return session?.get(sessionKey);
};

export const saveSession = async (request: Request, user: SessionUser) => {
	const session = await getSession(request);
	session.set(sessionKey, user);
	return new Headers({
		"Set-Cookie": await sessionStorage.commitSession(session),
	});
};

const googleStrategy = new GoogleStrategy(
	{
		clientId: "YOUR_CLIENT_ID",
		clientSecret: "YOUR_CLIENT_SECRET",
		// biome-ignore lint/style/useNamingConvention: @coji/remix-auth-google
		redirectURI: "https://example.com/auth/google/callback",
	},
	async ({ accessToken, tokens }) => {
		// Get the user data from your DB or API using the tokens and profile
	},
);

export const authenticator = new Authenticator<SessionUser>();
authenticator.use(googleStrategy);
