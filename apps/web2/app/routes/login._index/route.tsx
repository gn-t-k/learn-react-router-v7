import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@packages/react-components";
import {
	redirectToSearchParams,
	setRedirectTo,
} from "app/features/auth/redirect-manager";
import type { FC } from "react";
import { Link, data, href } from "react-router";
import type { Route } from "./+types/route";
import { card, cardFooter, container } from "./route.css";

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get(redirectToSearchParams) || "/";
	const headers = await setRedirectTo(redirectTo);

	return data(null, { headers });
};

const Page: FC<Route.ComponentProps> = () => {
	return (
		<main className={container}>
			<Card className={card}>
				<CardHeader>
					<CardTitle>Todoアプリ</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Googleアカウントでログインして利用できます</p>
				</CardContent>
				<CardFooter className={cardFooter}>
					<Button>
						<Link to={href("/auth/google")}>ログイン</Link>
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
};
export default Page;
