import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

import { deleteTestimonial, markRead } from './schema.js';
import { db } from '$lib/server/db';
import { venueBooking as paymentMethods } from '$lib/server/db/schema';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const readForm = await superValidate(zod4(markRead));
	const deleteForm = await superValidate(zod4(deleteTestimonial));

	const allPaymentMethods = await db.select().from(paymentMethods);

	return {
		readForm,
		deleteForm,
		allPaymentMethods
	};
};

export const actions: Actions = {
	read: async ({ request }) => {
		const form = await superValidate(request, zod4(markRead));

		if (!form.valid) {
			return message(
				form,
				{
					type: 'error',
					text: err.message
				},
				{ status: 500 }
			);
		}

		const { id, status } = form.data;

		try {
			await db.update(paymentMethods).set({ status: status }).where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Booking Successfully Updated' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: err.message
				},
				{ status: 500 }
			);
		}
	},
	delete: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(paymentMethods).where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Message Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting message.'
				},
				{ status: 500 }
			);
		}
	}
};
