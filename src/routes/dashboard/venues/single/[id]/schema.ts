import { z } from 'zod/v4';

export const edit = z.object({
	name: z.string().min(1, 'name is required'),
	capacity: z.number().int().positive().optional(),
	hours: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
	format: z.string().nullable().optional(),
	live: z.boolean().default(false),
	description: z.string().nullable().optional(),
	imageUrl: z.file('Image must be a valid file').max(10000000).nullable().optional()
});

// Type inference if needed
export type InsertEvent = z.infer<typeof insertEventSchema>;
