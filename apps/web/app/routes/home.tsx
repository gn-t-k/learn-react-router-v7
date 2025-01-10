import { Button } from "@packages/react-components";
import type { FC } from "react";
import type { Route } from "./+types/home";

export const meta = ({}: Route.MetaArgs) => {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
};

const Home: FC = () => {
	return <Button>ボタン</Button>;
};
export default Home;
