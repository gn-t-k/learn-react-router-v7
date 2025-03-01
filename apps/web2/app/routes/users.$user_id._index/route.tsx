import type { FC } from "react";
import type { Route } from "./+types/route";

const Page: FC<Route.ComponentProps> = ({ params }) => {
	return <p>ユーザーID: {params.user_id}</p>;
};
export default Page;
