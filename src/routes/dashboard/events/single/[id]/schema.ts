import { z } from 'zod/v4';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB limit
const ACCEPTED_FILE_TYPES = [
	'image/jpeg', // Common for both platforms
	'image/png', // Common for both platforms (and screenshots)
	'image/webp', // Common modern format (often Android screenshots/exports)
	'image/heic', // High Efficiency Image File (iOS default)
	'image/heif', // High Efficiency Image File (related to HEIC)
	'application/pdf' // Document format, kept from original
];

export const edit = z.object({
	id: z.number().int().positive().optional(), // Optional because it auto-increments on insert

	title: z.string().min(1, 'Title is required'),

	eventDate: z.string().min(1, 'Event date is required'), // Expects ISO string or formatted date text

	weekdayLabel: z.string().nullable().optional(),

	format: z.string().nullable().optional(),

	startsLabel: z.string().nullable().optional(),

	startsAt: z.string().nullable().optional(),

	endsLabel: z.string().nullable().optional(),

	endsAt: z.string().nullable().optional(),

	entryNote: z.string().nullable().optional(),

	entryType: z.enum(['free', 'ticketed']),

	pricePence: z.number().int().nonnegative().nullable().optional(),

	currency: z.string().default('GBP'),

	ticketUrl: z.string().url().nullable().optional(),

	isLive: z.boolean().default(false),

	isPublished: z.boolean().default(true),

	slug: z.string().min(1, 'Slug is required'),

	description: z.string().nullable().optional(),
	genres: z.array(z.number().int().positive()).min(1, 'At least one genre is required'),

	imageUrl: z.file().max(10000000).nullable().optional()
});

// Type inference if needed
export type InsertEvent = z.infer<typeof insertEventSchema>;

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;
