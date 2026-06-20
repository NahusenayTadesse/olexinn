<script lang="ts">
	import type { Snapshot } from '@sveltejs/kit';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';

	import { Plus, X } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { add as schema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';
	import Errors from '$lib/formComponents/Errors.svelte';
	import FormCard from '$lib/formComponents/FormCard.svelte';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	let { data } = $props();

	const { form, errors, enhance, delayed, allErrors, capture, restore, message } = superForm(
		data.form,
		{
			taintedMessage: () => {
				return new Promise((resolve) => {
					resolve(window.confirm('Do you want to leave?\nChanges you made may not be saved.'));
				});
			},
			onChange(event) {
				if (event.paths.includes('title')) {
					$form.slug = $form.title?.toLowerCase().replace(/\s+/g, '-');
				}
			},
			validators: zod4Client(schema),
			dataType: 'json'
		}
	);

	export const snapshot: Snapshot = { capture, restore };

	import { toast } from 'svelte-sonner';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	let images = $state([]);
</script>

<svelte:head>
	<title>Add New Event Item</title>
</svelte:head>

<FormCard title="Add An Event" description="Add New Event Portfolio">
	<form
		use:enhance
		action="?/addEvent"
		id="main"
		class="flex flex-col gap-4"
		method="POST"
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
			<InputComp {form} {errors} type="text" name="currency" label="Currency" placeholder="GBP" />
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
			label="Event Featured Image"
			placeholder="Upload Event Featured Image"
		/>

		<Button type="submit" class="mt-4" form="main">
			{#if $delayed}
				<LoadingBtn name="Adding Event..." />
			{:else}
				<Plus class="h-4 w-4" />
				Add Event
			{/if}
		</Button>
	</form>
</FormCard>
