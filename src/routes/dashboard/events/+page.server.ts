import { db } from '$lib/server/db';
import { events, genres, eventGenres } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async () => {
	// First, get products
	const eventList = await db.select().from(events);

	const genresWithEvents = await db
		.select({
			name: genres.name,
			eventId: eventGenres.eventId // Grab this directly from the junction table
		})
		.from(genres)
		.innerJoin(eventGenres, eq(genres.id, eventGenres.genreId));

	const combinedList = eventList.map((event) => {
		const eventGenresForEvent = genresWithEvents.filter((genre) => genre.eventId === event.id);
		return { ...event, genres: eventGenresForEvent.map((genre) => genre.name) };
	});

	return {
		eventList: combinedList
	};
};
