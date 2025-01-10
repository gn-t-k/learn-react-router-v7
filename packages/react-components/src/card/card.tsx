import clsx from "clsx";
import type { ComponentProps, FC } from "react";
import {
	cardContentStyles,
	cardDescriptionStyles,
	cardFooterStyles,
	cardHeaderStyles,
	cardStyles,
	cardTitleStyles,
} from "./card.css";

type CardProps = ComponentProps<"div">;
export const Card: FC<CardProps> = ({ className, ref, ...props }) => {
	return <div {...props} ref={ref} className={clsx(className, cardStyles)} />;
};

type CardHeaderProps = ComponentProps<"div">;
export const CardHeader: FC<CardHeaderProps> = ({
	className,
	ref,
	...props
}) => {
	return (
		<div {...props} ref={ref} className={clsx(className, cardHeaderStyles)} />
	);
};

type CardTitleProps = ComponentProps<"div">;
export const CardTitle: FC<CardTitleProps> = ({ className, ref, ...props }) => {
	return (
		<div {...props} ref={ref} className={clsx(className, cardTitleStyles)} />
	);
};

type CardDescriptionProps = ComponentProps<"div">;
export const CardDescription: FC<CardDescriptionProps> = ({
	className,
	ref,
	...props
}) => {
	return (
		<div
			{...props}
			ref={ref}
			className={clsx(className, cardDescriptionStyles)}
		/>
	);
};

type CardContentProps = ComponentProps<"div">;
export const CardContent: FC<CardContentProps> = ({
	className,
	ref,
	...props
}) => {
	return (
		<div {...props} ref={ref} className={clsx(className, cardContentStyles)} />
	);
};

type CardFooterProps = ComponentProps<"div">;
export const CardFooter: FC<CardFooterProps> = ({
	className,
	ref,
	...props
}) => {
	return (
		<div {...props} ref={ref} className={clsx(className, cardFooterStyles)} />
	);
};
