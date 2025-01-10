import type { ValueOf } from "@packages/utilities";
import type { StyleRule } from "@vanilla-extract/css";
import type { tokens } from "../../theme.css";

type Props =
	| {
			spaces?: ValueOf<typeof tokens.spacing> | undefined;
			justifyContent?: StyleRule["justifyContent"] | undefined;
			alignItems?: StyleRule["alignItems"] | undefined;
	  }
	| undefined;

export const cluster = (props?: Props) =>
	({
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: props?.spaces ?? 0,
		justifyContent: props?.justifyContent ?? "center",
		alignItems: props?.alignItems ?? "center",
	}) satisfies StyleRule;
