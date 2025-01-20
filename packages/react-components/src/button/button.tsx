import clsx from "clsx";
import type { ComponentPropsWithRef, FC } from "react";
import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import { type ButtonVariants, buttonStyle } from "./button.css";

type Props = ComponentPropsWithRef<"button"> & ButtonProps & ButtonVariants;

export const Button: FC<Props> = ({
	className,
	variant,
	size,
	ref,
	...props
}) => {
	return (
		<AriaButton
			className={clsx([className, buttonStyle({ variant, size })])}
			ref={ref}
			{...props}
		/>
	);
};
