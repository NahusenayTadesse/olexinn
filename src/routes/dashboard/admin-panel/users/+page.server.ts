import { db } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
import { user } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	const userList = await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt
		})
		.from(user);

	return {
		userList
	};
};
