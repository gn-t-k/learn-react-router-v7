import clsx from "clsx";
import {
	type ComponentRef,
	type ForwardRefRenderFunction,
	forwardRef,
} from "react";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { type ButtonVariants, buttonStyle } from "./button.css";

type Props = ButtonProps & ButtonVariants;

const ButtonRender: ForwardRefRenderFunction<ComponentRef<"button">, Props> = (
	{ className, variant, size, ...props },
	ref,
) => {
	return (
		<AriaButton
			className={clsx([className, buttonStyle({ variant, size })])}
			ref={ref}
			{...props}
		/>
	);
};
export const Button = forwardRef(ButtonRender);
