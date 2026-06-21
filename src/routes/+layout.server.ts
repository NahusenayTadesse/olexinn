import { loadFlash } from 'sveltekit-flash-message/server';

import { db } from '$lib/server/db';
import { events, genres, eventGenres, images as gallery, venues } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

const slugify = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const titleCase = (value: string) =>
	value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const formatPrice = (
	pricePence: number | null,
	entryType: string | null,
	entryNote: string | null
) => {
	if (entryType === 'free') return 'Free';

	if (pricePence !== null && pricePence !== undefined) {
		const pounds = pricePence / 100;

		return `£${pounds.toLocaleString('en-GB', {
			minimumFractionDigits: pricePence % 100 === 0 ? 0 : 2,
			maximumFractionDigits: 2
		})}`;
	}

	return entryNote || 'Ticketed';
};

const formatDateParts = (date: Date | string) => {
	const eventDate = new Date(date);

	return {
		day: new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(eventDate),
		num: new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(eventDate),
		mon: new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(eventDate)
	};
};

export const load = loadFlash(async () => {
	const eventList = await db
		.select({
			id: events.id,
			eventDate: events.eventDate,
			title: events.title,
			description: events.description,
			entryType: events.entryType,
			pricePence: events.pricePence,
			entryNote: events.entryNote,
			ticketUrl: events.ticketUrl
		})
		.from(events);

	const genresWithEvents = await db
		.select({
			name: genres.name,
			eventId: eventGenres.eventId
		})
		.from(genres)
		.innerJoin(eventGenres, eq(genres.id, eventGenres.genreId));

	const genresByEvent = new Map<number, string[]>();

	for (const genre of genresWithEvents) {
		const existing = genresByEvent.get(genre.eventId) ?? [];
		existing.push(genre.name);
		genresByEvent.set(genre.eventId, existing);
	}

	const combinedList = eventList.map((event) => {
		const dateParts = formatDateParts(event.eventDate);
		const eventGenreNames = genresByEvent.get(event.id) ?? [];
		const entryType = event.entryType ?? 'ticketed';
		const entrySlug = slugify(entryType);

		return {
			id: event.id,
			...dateParts,
			title: event.title,
			meta: event.description,
			genres: eventGenreNames,
			types: [entrySlug, ...eventGenreNames.map(slugify)],
			tag: formatPrice(event.pricePence, event.entryType, event.entryNote),
			tagClass: entrySlug,
			ticketHref: event.ticketUrl
		};
	});

	const entryFilters = Array.from(
		new Map(
			eventList.map((event) => {
				const value = slugify(event.entryType ?? 'ticketed');

				return [
					value,
					{
						value,
						label: value === 'free' ? 'Free Entry' : titleCase(value)
					}
				];
			})
		).values()
	);

	const genreFilters = Array.from(
		new Map(
			genresWithEvents.map((genre) => [
				slugify(genre.name),
				{
					value: slugify(genre.name),
					label: genre.name
				}
			])
		).values()
	);

	const images = await db.select().from(gallery);

	const [mainImage] = await db.select({ mainImage: gallery.mainImage }).from(gallery).limit(1);

	const imagesList = images.map((img) => img.imgURL);

	const venuesList = await db.select().from(venues);

	return {
		eventList: combinedList,
		filters: [{ value: 'all', label: 'All' }, ...entryFilters, ...genreFilters],
		gallery: imagesList,
		mainImage: mainImage?.mainImage,
		venues: venuesList
	};
});
