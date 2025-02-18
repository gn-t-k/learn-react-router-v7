import { GoogleStrategy } from "@coji/remix-auth-google";
import { getDatabase } from "@packages/database";
import { users } from "@packages/database/src/tables/users";
import acceptLanguage from "accept-language";
import { nanoid } from "nanoid";
import type { OAuth2Strategy } from "remix-auth-oauth2";
import invariant from "tiny-invariant";
import type { SessionUser } from "./authenticator.server";

const clientId = process.env["GOOGLE_CLIENT_ID"];
invariant(clientId, "環境変数`GOOGLE_CLIENT_ID`が設定されていません");

const clientSecret = process.env["GOOGLE_CLIENT_SECRET"];
invariant(clientSecret, "環境変数`GOOGLE_CLIENT_SECRET`が設定されていません");

const isDev = process.env["NODE_ENV"] === "development";
const devOrigin = "http://localhost:5173";
const prodOrigin = "https://example.com";
// biome-ignore lint/style/useNamingConvention: @coji/remix-auth-google
const redirectURI = `${isDev ? devOrigin : prodOrigin}/auth/google/callback`;

const verifyUser: OAuth2Strategy<SessionUser>["verify"] = async ({
	request,
	tokens,
}) => {
	const id = nanoid();
	const profile = await GoogleStrategy.userProfile(tokens);
	const email = profile.emails[0].value;
	const name = profile.displayName;
	const imageUrl = profile.photos?.[0].value;
	const locale =
		profile._json.locale ??
		acceptLanguage.get(request.headers.get("accept-language")) ??
		"en";

	const db = getDatabase();

	try {
		// TODO: ユーザーのupsert
		const [user] = await db
			.insert(users)
			.values({ id, imageUrl, name })
			.onConflictDoUpdate({
				target: users.id,
				set: { name, imageUrl },
			})
			.returning();

		if (user === undefined) {
			throw new Error("userのupsertクエリのreturningが失敗しました");
		}

		return {
			id: user.id,
			name: user.name,
			email,
			imageUrl: user.imageUrl,
			locale,
		};
	} catch (error) {
		throw new Error("ユーザーの取得に失敗しました", { cause: error });
	}
};

export const googleStrategy = new GoogleStrategy(
	{ clientId, clientSecret, redirectURI },
	verifyUser,
);
