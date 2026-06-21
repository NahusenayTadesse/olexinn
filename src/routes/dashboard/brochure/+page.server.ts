import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { add } from './schema';

import { db } from '$lib/server/db';
import { brochure as gallery } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));

	const [brochureImage] = await db.select().from(gallery).limit(1);

	return { form, brochure: brochureImage?.brochure };
};

import { saveUploadedFile } from '$lib/server/upload';

export const actions: Actions = {
	editGallery: async ({ request }) => {
		const form = await superValidate(request, zod4(add));

		const { brochure } = form.data;

		try {
			if (brochure) {
				const img = await saveUploadedFile(brochure);

				await db.transaction(async (tx) => {
					await tx.delete(gallery);
					await tx.insert(gallery).values({ brochure: img });
				});
			}
			return message(form, { type: 'success', text: 'Partner Logos added Successfully!' });
		} catch (err) {
			console.error('Error marking adding Partner Logos:', err);
			return message(
				form,
				{ type: 'error', text: `Unexpected Error: ${err?.message}` },
				{ status: 500 }
			);
		}
	}
};
