<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { edit } from './schema.js';
	let { data } = $props();

	import SingleTable from '$lib/components/SingleTable.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { ArrowLeft, Pencil, Save } from '@lucide/svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import Delete from '$lib/forms/Delete.svelte';
	import SingleView from '$lib/components/SingleView.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let singleTable = $derived([
		{ name: 'Name', value: data.event?.name },

		{ name: 'Capacity', value: data.event?.capacity + ' people' || 'N/A' },
		{ name: 'Hours', value: data.event?.hours || 'N/A' },
		{ name: 'Format', value: data.event?.format || 'N/A' },
		{ name: 'Address', value: data.event?.address || 'N/A' },

		{ name: 'Live Event', value: data.event?.live ? 'Yes' : 'No' },

		{ name: 'Venue Description', value: data.event?.description || 'No description provided.' },
		{
			name: 'Added On',
			value: data.event?.createdAt ? formatEthiopianDate(new Date(data.event.createdAt)) : 'N/A'
		}
	]);

	const { form, errors, enhance, delayed, capture, restore, allErrors, message } = superForm(
		data.form,
		{
			validators: zod4Client(edit),
			resetForm: false,
			dataType: 'json'
		}
	);

	export const snapshot: Snapshot = { capture, restore };

	//   let date = $derived(dateProxy(editForm, 'appointmentDate', { format: 'date'}));

	let editForm = $state(false);
	import { toast } from 'svelte-sonner';

	import { formatEthiopianDate } from '$lib/global.svelte.js';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});
</script>

<svelte:head>
	<title>Venue Details</title>
</svelte:head>

<SingleView title={data?.event?.name} photo={String(data?.event?.imgUrl)} class="w-full!">
	<div class="mt-4 flex w-full flex-row flex-wrap items-start justify-start gap-2 pl-4">
		<Button onclick={() => (editForm = !editForm)}>
			{#if !editForm}
				<Pencil class="h-4 w-4" />
				Edit
			{:else}
				<ArrowLeft class="h-4 w-4" />

				Back
			{/if}
		</Button>

		<Delete redirect="/dashboard/venues" />
	</div>

	{#if editForm === false}
		<div class="w-full p-4"><SingleTable {singleTable} /></div>
	{/if}
	{#if editForm}
		<div class="w-full p-4">
			<form
				action="?/editProduct"
				use:enhance
				class="flex w-full flex-col items-start justify-start gap-4 lg:w-full"
				id="edit"
				method="post"
				enctype="multipart/form-data"
			>
				<Errors allErrors={$allErrors} />

				<InputComp
					{form}
					{errors}
					type="text"
					name="name"
					label="Venue Name"
					placeholder="Enter Name"
					required
				/>

				<InputComp
					{form}
					{errors}
					type="text"
					name="format"
					label="Format"
					placeholder="e.g. DJ Night, Live performance"
				/>
				<InputComp {form} {errors} type="number" name="capacity" label="Capacity" />

				<InputComp
					{form}
					{errors}
					type="text"
					name="hours"
					label="Hours"
					placeholder="e.g. 8AM - 10PM"
				/>

				<InputComp
					{form}
					{errors}
					type="checkboxSingle"
					name="live"
					label="Is Venue for Live Event"
					placeholder="Is this for a live performance/event?"
				/>

				<InputComp
					{form}
					{errors}
					type="textarea"
					name="description"
					label="Venue Description"
					placeholder="Enter Venue Description"
				/>

				<InputComp
					{form}
					{errors}
					type="text"
					name="address"
					label="Address"
					placeholder="Enter Address"
				/>

				<InputComp
					{form}
					{errors}
					type="file"
					image={data?.event?.imgUrl ?? ''}
					name="imageUrl"
					label="Venue Featured Image"
					placeholder="Upload Event Featured Image"
				/>

				<Button form="edit" type="submit" class="mt-4">
					{#if $delayed}
						<LoadingBtn name="Saving Changes" />
					{:else}
						<Save class="h-4 w-4" />
						Save Changes
					{/if}
				</Button>
			</form>
		</div>
	{/if}
</SingleView>
