import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { add } from './schema';
import { db } from '$lib/server/db';
import { eventGenres, events, genres } from '$lib/server/db/schema';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types.js';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));

	const genreList = await db
		.select({
			value: genres.id,
			name: genres.name
		})
		.from(genres);

	return {
		form,
		genreList
	};
};

import { saveUploadedFile } from '$lib/server/upload.js';

export const actions: Actions = {
	addEvent: async ({ request, cookies, locals }) => {
		// Validating with your zod4 schema (assuming it is exported as insertEventSchema)
		const form = await superValidate(request, zod4(add));
		console.log(form);

		if (!form.valid) {
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return message(
				form,
				{ type: 'error', text: 'Please check your form data.' },
				{ status: 400 }
			);
		}

		// Destructure fields exactly matching your schema
		const {
			title,
			slug,
			eventDate,
			weekdayLabel,
			format,
			startsLabel,
			startsAt,
			endsLabel,
			endsAt,
			entryNote,
			entryType,
			pricePence,
			currency,
			ticketUrl,
			isLive,
			isPublished,
			description,
			genres,
			imageUrl // This is the File object from Zod validation
		} = form.data;

		// 1. Process network I/O uploads BEFORE starting the DB transaction
		let uploadedImageUrl: string | null = null;
		if (imageUrl instanceof File && imageUrl.size > 0) {
			uploadedImageUrl = await saveUploadedFile(imageUrl);
		}
		const result = await db.transaction(async (tx) => {
			let newSlug = slug;

			// Check for an existing slug inside the events table
			const existingSlug = await tx
				.select({ slug: events.slug })
				.from(events)
				.where(eq(events.slug, slug))
				.limit(1);

			if (existingSlug.length > 0) {
				newSlug = `${slug}-1`;
			}

			// 2. Insert the main event row
			const [newEvent] = await tx
				.insert(events)
				.values({
					title,
					slug: newSlug,
					eventDate,
					weekdayLabel,
					format,
					startsLabel,
					startsAt,
					endsLabel,
					endsAt,
					entryNote,
					entryType,
					pricePence,
					currency,
					ticketUrl,
					isLive,
					isPublished,
					description,
					imageUrl: uploadedImageUrl // Saved file path/URL string goes here
				})
				.returning();

			await tx
				.insert(eventGenres)
				.values(genres.map((genreId) => ({ eventId: newEvent.id, genreId })));

			return newEvent.id;
		});

		if (!result) {
			return message(
				form,
				{
					type: 'error',
					text: 'An error occurred while adding the event.'
				},
				{ status: 500 }
			);
		} else {
			// Success mapping
			message(form, { type: 'success', text: 'New Event Successfully Added' });

			// Adjust redirect path based on your design paths
			throw redirect(
				303,
				`/dashboard/events/single/${result}`,
				{ type: 'success', message: 'New Event Successfully Added' },
				cookies
			);
		}
	}
};
const uploadGallery = async (gallery: File[] | undefined) => {
	try {
		// 1. Map each file to the upload promise
		const uploadPromises = gallery.map(async (file) => {
			const address = await saveUploadedFile(file);
			return address; // This is the string returned by your function
		});

		// 2. Wait for all uploads to complete and store results in an array
		const uploadedAddresses: string[] = await Promise.all(uploadPromises);

		console.log('All files uploaded:', uploadedAddresses);

		return uploadedAddresses;
	} catch (error) {
		console.error('Error uploading gallery:', error);
		throw error;
	}
};
