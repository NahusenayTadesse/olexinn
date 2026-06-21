PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `images` (
	`mainImage` text,
	`imgURL` text
);
--> statement-breakpoint
INSERT INTO `__new_images`("mainImage", "imgURL") SELECT "mainImage", "imgURL" FROM `images`;--> statement-breakpoint
DROP TABLE `images`;--> statement-breakpoint
ALTER TABLE `__new_images` RENAME TO `images`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
