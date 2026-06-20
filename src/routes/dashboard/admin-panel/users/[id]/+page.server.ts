import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { editUserSchema as schema } from './schema';

import { db } from '$lib/server/db';
import { roles, user, permissions, rolePermissions, session } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { fail } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const form = await superValidate(zod4(schema));

	const singleUser = await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,

			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		})
		.from(user)
		.where(eq(user.id, id))
		.limit(1)
		.then((rows) => rows[0]);

	if (!singleUser) {
		error(404, { message: 'User not found' });
	}

	return {
		singleUser,
		id,
		form
	};
};

// import { saveUploadedFile } from '$lib/server/upload';

export const actions: Actions = {
	editUser: async ({ request, cookies, locals, params }) => {
		const form = await superValidate(request, zod4(schema));

		const { id } = params;

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { name, email } = form.data;

		try {
			const existingUser = await db
				.select()
				.from(user)
				.where(eq(user.email, email))
				.then((res) => res[0]);

			if (existingUser) {
				if (existingUser.id !== id) {
					setError(form, 'email', 'User with this email already exists, change your email.');
					return message(
						form,
						{
							type: 'error',
							text: 'User with this email already exists, change your email.'
						},
						{ status: 400 }
					);
				}
			}
			await db
				.update(user)
				.set({
					name,
					email
				})
				.where(eq(user.id, id));

			await db.delete(session).where(eq(session.userId, id));

			// Stay on the same page and set a flash message
			setFlash({ type: 'success', message: 'User Updated Successuflly Added' }, cookies);
			return message(form, { type: 'success', text: 'User Updated Successfully' });
		} catch (err) {
			setFlash({ type: 'error', message: 'User Update Failed: ' + err?.message }, cookies);
			return message(form, { type: 'error', text: 'User Update Failed ' + err?.message });
		}
	},
	delete: async ({ cookies, params }) => {
		const { id } = params;

		try {
			if (!id) {
				setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
				return fail(400);
			}

			await db.delete(user).where(eq(user.id, id));

			setFlash({ type: 'success', message: 'User Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting user:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return message(form, { type: 'error', text: 'Unexpected Error: ' + err?.message });
		}
	}
};
