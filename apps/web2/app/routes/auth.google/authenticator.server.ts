import { Authenticator } from "remix-auth";
import { googleStrategy } from "./google-strategy";

export type SessionUser = {
	id: string;
	email: string;
	name: string;
	imageUrl: string;
	locale: string;
};
export const authenticator = new Authenticator<SessionUser>();

authenticator.use(googleStrategy, "google");
