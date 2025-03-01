import { center, tokens } from "@packages/styles";
import { style } from "@vanilla-extract/css";

export const container = style({
	minHeight: "100dvh",
	...center(),
	backgroundColor: tokens.color.background,
});

export const card = style({
	width: tokens.width[80],
});

export const cardFooter = style({
	justifyContent: "center",
});
