import { z } from 'zod/v4';

export const add = z.object({
	brochure: z
		.file()
		.max(100 * 1024 * 1024)
		.optional()
});
