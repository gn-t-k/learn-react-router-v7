import type { Meta, StoryObj } from "@storybook/react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
	component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Card title</CardTitle>
				<CardDescription>Card description</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card content</p>
			</CardContent>
			<CardFooter>
				<p>Card footer</p>
			</CardFooter>
		</Card>
	),
};
