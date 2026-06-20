CREATE TABLE `contact_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(100) NOT NULL,
	`phone` text(20),
	`subject` text(255) NOT NULL,
	`message` text NOT NULL,
	`address` text(255),
	`seen` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event_genres` (
	`event_id` integer NOT NULL,
	`genre_id` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_genres_event_id_genre_id_idx` ON `event_genres` (`event_id`,`genre_id`);--> statement-breakpoint
CREATE INDEX `event_genres_event_id_idx` ON `event_genres` (`event_id`);--> statement-breakpoint
CREATE INDEX `event_genres_genre_id_idx` ON `event_genres` (`genre_id`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`event_date` text NOT NULL,
	`weekday_label` text,
	`format` text,
	`starts_label` text,
	`starts_at` text,
	`ends_label` text,
	`ends_at` text,
	`entry_note` text,
	`entry_type` text NOT NULL,
	`price_pence` integer,
	`currency` text DEFAULT 'GBP' NOT NULL,
	`ticket_url` text,
	`is_live` integer DEFAULT false NOT NULL,
	`is_published` integer DEFAULT true NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`image_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_idx` ON `events` (`slug`);--> statement-breakpoint
CREATE INDEX `events_event_date_idx` ON `events` (`event_date`);--> statement-breakpoint
CREATE INDEX `events_entry_type_idx` ON `events` (`entry_type`);--> statement-breakpoint
CREATE INDEX `events_published_date_idx` ON `events` (`is_published`,`event_date`);--> statement-breakpoint
CREATE TABLE `genres` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `genres_name_idx` ON `genres` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `genres_slug_idx` ON `genres` (`slug`);