import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { editGallery } from './schema';

import { db } from '$lib/server/db';
import { heroImages as gallery } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(editGallery));

	const images = await db.select().from(gallery);

	const imagesList = images.map((img) => img.imgURL);

	return { form, gallery: imagesList };
};

import { saveUploadedFile } from '$lib/server/upload';

export const actions: Actions = {
	editGallery: async ({ request }) => {
		const form = await superValidate(request, zod4(editGallery));

		const { existing, images } = form.data;

		try {
			let galleryImages: string[] = [];

			// 1. Upload new files if they exist
			if (images && images.length > 0) {
				galleryImages = await uploadGallery(images);
			}

			await db.transaction(async (tx) => {
				const old = existing.split(',');

				const finalList = [...new Set([...old, ...galleryImages])].filter(
					(item) => item && item.trim() !== ''
				);

				if (finalList.length > 0) {
					const imageRecords = finalList.map((url) => ({
						imgUrl: url
					}));

					await tx.delete(gallery);
					await tx.insert(gallery).values(imageRecords);
				} else {
					// Handle the case where all images were removed
					await tx.delete(gallery);
				}
			});

			return message(form, { type: 'success', text: 'Hero Images added Successfully!' });
		} catch (err) {
			console.error('Error adding Hero Images:', err);
			return message(
				form,
				{ type: 'error', text: `Unexpected Error: ${err?.message}` },
				{ status: 500 }
			);
		}
	}
};

const uploadGallery = async (gallery: File[] | undefined) => {
	try {
		// 1. Map each file to the upload promise
		const uploadPromises = gallery.map(async (file) => {
			const address = await saveUploadedFile(file);
			return address; // This is the string returned by your function
		});

		// 2. Wait for all uploads to complete and store results in an array
		const uploadedAddresses: string[] = await Promise.all(uploadPromises);

		console.log('All files uploaded:', uploadedAddresses);

		return uploadedAddresses;
	} catch (error) {
		console.error('Error uploading gallery:', error);
		throw error;
	}
};
