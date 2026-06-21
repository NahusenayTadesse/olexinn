import { db } from '$lib/server/db';
import { venues } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async () => {
	// First, get products
	const venueList = await db.select().from(venues);

	return {
		venueList
	};
};
