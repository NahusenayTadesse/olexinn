import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { edit, editGallery } from './schema';

import { db } from '$lib/server/db';
import { venues as products } from '$lib/server/db/schema';
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

		const { name, capacity, hours, address, format, live, description, imageUrl } = form.data;

		try {
			if (imageUrl) {
				const featuredImage = await saveUploadedFile(imageUrl);

				await db
					.update(products)
					.set({
						name,
						capacity,
						hours,
						address,
						format,
						live,
						description,
						imgUrl: featuredImage
					})
					.where(eq(products.id, Number(id)));
			} else {
				await db
					.update(products)
					.set({
						name,
						capacity,
						hours,
						address,
						format,
						live,
						description
					})
					.where(eq(products.id, Number(id)));
			}

			return message(form, { type: 'success', text: 'Venue Portfolio Updated Successfully' });
		} catch (err) {
			console.error(err?.message);

			return message(form, { type: 'error', text: 'Venue Portfolio Update Failed' + err?.message });
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

			setFlash({ type: 'success', message: 'Venue Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting Venue:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return fail(400);
		}
	}
};
