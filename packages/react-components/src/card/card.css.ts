import { cluster, stack, text, tokens } from "@packages/styles";
import { style } from "@vanilla-extract/css";

export const cardStyles = style({
	borderRadius: tokens.borderRadius.lg,
	border: `1px solid ${tokens.color.border}`,
	backgroundColor: tokens.color.card,
	color: tokens.color.cardForeground,
	boxShadow: tokens.boxShadow.sm,
});

export const cardHeaderStyles = style({
	...stack({ spaces: tokens.spacing[1.5] }),
	padding: tokens.spacing[6],
});

export const cardTitleStyles = style({
	...text({ size: "2xl" }),
	fontWeight: 600,
	letterSpacing: tokens.letterSpacing.tight,
});

export const cardDescriptionStyles = style({
	...text({ size: "sm" }),
	color: tokens.color.mutedForeground,
});

export const cardContentStyles = style({
	padding: tokens.spacing[6],
	paddingTop: 0,
});

export const cardFooterStyles = style({
	...cluster({ justifyContent: "flex-start" }),
	padding: tokens.spacing[6],
	paddingTop: 0,
});
