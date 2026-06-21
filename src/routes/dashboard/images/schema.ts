import { z } from 'zod/v4';

export const editGallery = z.object({
	mainImage: z.file().max(10000000).optional(),
	existing: z.string(),
	images: z.file().max(10000000).array().optional()
});
