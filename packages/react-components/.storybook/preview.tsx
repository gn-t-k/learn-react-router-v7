import { ThemeProvider } from "@packages/styles";
import type { Preview } from "@storybook/react";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => {
			return (
				<ThemeProvider>
					<Story />
				</ThemeProvider>
			);
		},
	],
};

export default preview;
