DROP INDEX `genres_name_idx`;--> statement-breakpoint
DROP INDEX `genres_slug_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `genres_name_unique` ON `genres` (`name`);--> statement-breakpoint
ALTER TABLE `genres` DROP COLUMN `slug`;