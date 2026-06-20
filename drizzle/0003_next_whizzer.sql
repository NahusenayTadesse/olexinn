CREATE TABLE `venue_booking` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firstName` text(255) NOT NULL,
	`lastName` text(255) NOT NULL,
	`eventType` text(255) NOT NULL,
	`email` text(100) NOT NULL,
	`eventDate` text(100) NOT NULL,
	`phone` text(20),
	`guest_count` integer,
	`description` text,
	`status` text(50) DEFAULT 'pending',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
