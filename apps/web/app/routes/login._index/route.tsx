import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@packages/react-components";
import type { FC } from "react";
import { card, cardFooter, container } from "./page.css";

const Page: FC = () => {
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
					<Button>ログインボタン</Button>
				</CardFooter>
			</Card>
		</main>
	);
};
export default Page;
