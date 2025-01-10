import { keyframes } from "@vanilla-extract/css";

export const bounce = keyframes({
	"0%, 100%": {
		transform: "translateY(-25%)",
		animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
	},
	"50%": {
		transform: "none",
		animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
	},
});
