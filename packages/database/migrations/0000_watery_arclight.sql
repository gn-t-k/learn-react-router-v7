CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`completed` integer NOT NULL,
	`owner_id` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_authenticated_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`authenticated_by` text NOT NULL,
	`authenticatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`locale` text NOT NULL,
	`image_url` text NOT NULL
);
