import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { edit, editGallery } from './schema';

import { db } from '$lib/server/db';
import { events as event, user } from '$lib/server/db/schema';
import { eq, sql, getTableColumns } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { id } = params;

	const product = await db
		.select()
		.from(event)
		.where(eq(event.id, Number(id)))
		.limit(1)
		.then((rows) => rows[0]);

	const form = await superValidate(product, zod4(edit));
	const galleryEdit = await superValidate(zod4(editGallery));

	return {
		event: product,
		form,

		galleryEdit
	};
};
