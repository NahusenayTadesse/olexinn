import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { add } from './schema';
import { db } from '$lib/server/db';
import { venues } from '$lib/server/db/schema';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types.js';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));

	return {
		form
	};
};

import { saveUploadedFile } from '$lib/server/upload.js';

export const actions: Actions = {
	addEvent: async ({ request, cookies }) => {
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

		const { name, capacity, hours, address, format, live, description, imageUrl } = form.data;

		let uploadedImageUrl: string | null = null;
		if (imageUrl instanceof File && imageUrl.size > 0) {
			uploadedImageUrl = await saveUploadedFile(imageUrl);
		}
		const result = await db.transaction(async (tx) => {
			// 2. Insert the main event row
			const [newId] = await tx
				.insert(venues)
				.values({
					name,
					capacity,
					hours,
					address,
					format,
					live,
					description,
					imgUrl: uploadedImageUrl
				})
				.$returningId();

			return newId.id;
		});

		if (!result) {
			return message(
				form,
				{
					type: 'error',
					text: 'An error occurred while adding the venues.'
				},
				{ status: 500 }
			);
		} else {
			// Success mapping
			message(form, { type: 'success', text: 'New Venues Successfully Added' });

			// Adjust redirect path based on your design paths
			redirect(
				303,
				`/dashboard/venues/single/${result}`,
				{ type: 'success', message: 'New Venue Successfully Added' },
				cookies
			);
		}
	}
};
