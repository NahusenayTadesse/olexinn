import { z } from 'zod';

export const add = z.object({
	id: z.number().int().positive().optional(), // Optional because it auto-increments on insert

	title: z.string().min(1, 'Title is required'),

	eventDate: z.string().optional(), // Expects ISO string or formatted date text

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

	imageUrl: z.file('Image must be a valid file').max(10000000).nullable().optional(),
	genres: z.array(z.number().int().positive()).min(1, 'At least one genre is required')
});

// Type inference if needed
