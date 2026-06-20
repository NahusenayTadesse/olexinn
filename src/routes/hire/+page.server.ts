import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

import { hireSchema } from './schema.js';
import { db } from '$lib/server/db';
import { venueBooking } from '$lib/server/db/schema';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(hireSchema));

	return {
		form
	};
};

export const actions: Actions = {
	book: async ({ request }) => {
		const form = await superValidate(request, zod4(hireSchema));
		console.log(form);

		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please fill out the form correctly.' });
		}

		const { firstName, lastName, email, phone, enquiry, eventDate, eventType, expectedGuests } =
			form.data;

		try {
			await db.insert(venueBooking).values({
				firstName,
				lastName,
				email,
				phone,
				enquiry,
				eventDate,
				eventType,
				expectedGuests
			});
			return message(form, { type: 'success', text: 'Booking Successfully Submitted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while adding Booking.'
				},
				{ status: 500 }
			);
		}
	}
};
