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
</script>

<svelte:head>
	<title>Add New Venue</title>
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
			name="name"
			label="Venue Name"
			placeholder="Enter Name"
			required
		/>

		<InputComp {form} {errors} type="number" name="capacity" label="Capacity" />

		<InputComp
			{form}
			{errors}
			type="text"
			name="format"
			label="Format"
			placeholder="e.g. DJ Night, Live performance"
		/>

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
			label="Is Live Venue"
			placeholder="Is this a live performance/Venue?"
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
			name="imageUrl"
			label="Venue Featured Image"
			placeholder="Upload Venue Featured Image"
		/>

		<Button type="submit" class="mt-4" form="main">
			{#if $delayed}
				<LoadingBtn name="Adding Venue..." />
			{:else}
				<Plus class="h-4 w-4" />
				Add Venue
			{/if}
		</Button>
	</form>
</FormCard>
