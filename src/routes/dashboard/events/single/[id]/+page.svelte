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
		{ name: 'Title', value: data.event?.title },
		{ name: 'Slug', value: data.event?.slug },
		{
			name: 'Event Date',
			value: data.event?.eventDate ? formatEthiopianDate(data.event.eventDate) : 'N/A'
		},
		{ name: 'Weekday', value: data.event?.weekdayLabel || 'N/A' },
		{ name: 'Format', value: data.event?.format || 'N/A' },
		{
			name: 'Timings',
			value:
				`${data.event?.startsLabel || ''} ${data.event?.startsAt || ''} → ${data.event?.endsLabel || ''} ${data.event?.endsAt || ''}`.trim() ||
				'N/A'
		},
		{ name: 'Entry Type', value: data.event?.entryType },
		{ name: 'Entry Note', value: data.event?.entryNote || 'N/A' },
		{
			name: 'Price',
			value: data.event?.pricePence
				? `${data.event.currency || 'GBP'} ${(data.event.pricePence / 100).toFixed(2)}`
				: 'Free'
		},
		{ name: 'Live Event', value: data.event?.isLive ? 'Yes' : 'No' },
		{ name: 'Published', value: data.event?.isPublished ? 'Yes' : 'No' },
		{ name: 'Ticket Link', value: data.event?.ticketUrl || 'N/A' },
		{ name: 'Event Description', value: data.event?.description || 'No description provided.' },
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
	let editGallery = $state(false);
	import { toast } from 'svelte-sonner';
	import Gallery from '$lib/components/gallery.svelte';
	import EditGallery from './editGallery.svelte';
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

	let images = $derived(data?.images);
</script>

<svelte:head>
	<title>Event Details</title>
</svelte:head>

<SingleView title={data?.event?.title} photo={String(data?.event?.imageUrl)} class="w-full!">
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

		<Delete redirect="/dashboard/events" />
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
					name="title"
					label="Event Title"
					placeholder="Enter Title"
					required
				/>

				<InputComp
					{form}
					{errors}
					type="text"
					name="slug"
					label="Event Slug"
					placeholder="Enter Slug"
					required
				/>

				<InputComp
					{form}
					{errors}
					type="checkbox"
					name="genres"
					label="Genre"
					items={data?.genreList}
					placeholder="Select Genre"
					required
				/>
				<div>
					<InputComp
						{form}
						{errors}
						type="date"
						name="eventDate"
						label="Event Date"
						placeholder="Select Event Date"
						required
					/>
					<p>Leave blank to use current date or if it is recurring.</p>
				</div>
				<InputComp
					{form}
					{errors}
					type="select"
					name="weekdayLabel"
					label="Weekday Label"
					items={[
						{ value: 'monday', name: 'Monday' },
						{ value: 'tuesday', name: 'Tuesday' },
						{ value: 'wednesday', name: 'Wednesday' },
						{ value: 'thursday', name: 'Thursday' },
						{ value: 'friday', name: 'Friday' },
						{ value: 'saturday', name: 'Saturday' },
						{ value: 'sunday', name: 'Sunday' }
					]}
					placeholder="e.g. Thu / Fri / Sat"
				/>

				<InputComp
					{form}
					{errors}
					type="text"
					name="format"
					label="Format"
					placeholder="e.g. DJ Night, Live performance"
				/>

				<div class="grid grid-cols-2 gap-4">
					<InputComp
						{form}
						{errors}
						type="text"
						name="startsLabel"
						label="Starts Label"
						placeholder="e.g. Doors 8PM"
					/>
					<InputComp
						{form}
						{errors}
						type="time"
						name="startsAt"
						label="Starts At (Time)"
						placeholder="e.g. 20:00"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<InputComp
						{form}
						{errors}
						type="text"
						name="endsLabel"
						label="Ends Label"
						placeholder="e.g. Until 4AM"
					/>
					<InputComp
						{form}
						{errors}
						type="time"
						name="endsAt"
						label="Ends At (Time)"
						placeholder="e.g. 04:00"
					/>
				</div>

				<InputComp
					{form}
					{errors}
					type="text"
					name="entryNote"
					label="Entry Note"
					placeholder="e.g. Free before 9PM, Walk in"
				/>

				<InputComp
					{form}
					{errors}
					type="text"
					name="entryType"
					label="Entry Type"
					placeholder="free or ticketed"
					required
				/>

				<div class="grid grid-cols-2 gap-4">
					<InputComp
						{form}
						{errors}
						type="number"
						name="pricePence"
						label="Price (in Pence)"
						placeholder="e.g. 1000 for £10"
					/>
					<InputComp
						{form}
						{errors}
						type="text"
						name="currency"
						label="Currency"
						placeholder="GBP"
					/>
				</div>

				<InputComp
					{form}
					{errors}
					type="text"
					name="ticketUrl"
					label="Ticket URL"
					placeholder="https://..."
				/>

				<div class="flex flex-col gap-2">
					<InputComp
						{form}
						{errors}
						type="checkboxSingle"
						name="isLive"
						label="Is Live Event"
						placeholder="Is this a live performance/event?"
					/>

					<InputComp
						{form}
						{errors}
						type="checkboxSingle"
						name="isPublished"
						label="Is Published"
						placeholder="Make this event visible immediately"
					/>
				</div>

				<InputComp
					{form}
					{errors}
					type="textarea"
					name="description"
					label="Event Description"
					placeholder="Enter Event Description"
				/>

				<InputComp
					{form}
					{errors}
					type="file"
					name="imageUrl"
					image={data?.event?.imageUrl ?? ''}
					label="Event Featured Image"
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

<div class="mx-auto my-12 px-4 sm:px-6 lg:px-4">
	{#if data?.product?.title}
		<div class="mb-6 border-b border-gray-100 pb-4">
			<nav class="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase">
				Gallery Images
			</nav>
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
				{data.product.title}
			</h1>
		</div>
	{/if}
</div>
