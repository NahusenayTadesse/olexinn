CREATE TABLE `venues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text,
	`capacity` integer,
	`format` text,
	`imgUrl` text,
	`hours` text,
	`address` text,
	`live` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
