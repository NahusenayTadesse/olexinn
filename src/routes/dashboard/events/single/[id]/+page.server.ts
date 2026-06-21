import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { edit, editGallery } from './schema';

import { db } from '$lib/server/db';
import { eventGenres, events as products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, message } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';

import { saveUploadedFile } from '$lib/server/upload';
import type { Actions } from './$types';

export const actions: Actions = {
	editProduct: async ({ request, cookies, locals, params }) => {
		const { id } = params;
		const form = await superValidate(request, zod4(edit));
		console.log(form.data);

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

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
			imageUrl
		} = form.data;

		try {
			await db.transaction(async (tx) => {
				if (imageUrl) {
					const featuredImage = await saveUploadedFile(imageUrl);

					await tx
						.update(products)
						.set({
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
							imageUrl: featuredImage
						})
						.where(eq(products.id, Number(id)));
				} else {
					await tx
						.update(products)
						.set({
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
							description
						})
						.where(eq(products.id, Number(id)));
				}

				await tx.delete(eventGenres).where(eq(eventGenres.eventId, Number(id)));
				await tx
					.insert(eventGenres)
					.values(genres.map((genreId) => ({ eventId: Number(id), genreId })));
			});

			return message(form, { type: 'success', text: 'Event Portfolio Updated Successfully' });
		} catch (err) {
			console.error(err?.message);

			return message(form, { type: 'error', text: 'Event Portfolio Update Failed' + err?.message });
		}
	},

	delete: async ({ cookies, params }) => {
		const { id } = params;

		try {
			if (!id) {
				setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
				return fail(400);
			}

			await db.delete(products).where(eq(products.id, Number(id)));

			setFlash({ type: 'success', message: 'Event Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting Event:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return fail(400);
		}
	}
};
