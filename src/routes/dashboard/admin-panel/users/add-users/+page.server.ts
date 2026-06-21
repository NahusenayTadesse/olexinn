// import { encodeBase32LowerCase } from '@oslojs/encoding';

import type { Actions, PageServerLoad } from '../$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { add } from './schema';
import { auth } from '$lib/server/auth';

import { APIError } from 'better-auth';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));

	return { form };
};

export const actions: Actions = {
	add: async (event) => {
		const form = await superValidate(event.request, zod4(add));
		console.log(form);
		if (!form.valid) {
			return message(
				form,
				{
					type: 'error',
					text: 'Please Check the form}'
				},
				{
					status: 500
				}
			);
		}

		const { name, email, password } = form.data;

		try {
			await auth.api.createUser({
				body: {
					email,
					password,
					name,
					role: 'admin'
				}
			});

			return message(form, {
				type: 'success',
				text: 'User Added Successful!'
			});
		} catch (error) {
			console.error(error);
			if (error instanceof APIError) {
				return message(
					form,
					{
						type: 'error',
						text: error?.message
					},
					{
						status: 500
					}
				);
			}
			return message(
				form,
				{
					type: 'error',
					text: 'Registration Failed' + error?.message
				},
				{
					status: 500
				}
			);
		}
	}
};
