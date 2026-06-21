import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { edit } from './schema';

import { db } from '$lib/server/db';
import { venues as event } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
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

	return {
		event: product,
		form
	};
};
