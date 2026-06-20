<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import type { MarkRead as schema } from './schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { CircleCheckBig, SquarePen } from '@lucide/svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let {
		data,
		id,
		status
	}: {
		data: SuperValidated<Infer<schema>>;
		id: number;
		status: string;
	} = $props();

	const { form, enhance, errors, delayed, message, allErrors } = superForm(data, {
		resetForm: false
	});
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	$form.id = id;
	$form.status = status;
</script>

<DialogComp title={status.toUpperCase()} variant="outline" IconComp={SquarePen}>
	<form
		method="post"
		id="read"
		class="-mt-4 flex h-full flex-col items-start justify-start"
		action="?/read"
		use:enhance
	>
		<Errors allErrors={$allErrors} />

		<InputComp
			{form}
			{errors}
			type="select"
			name="status"
			label="Status"
			items={[
				{ value: 'pending', name: 'Pending' },
				{ value: 'completed', name: 'Completed' },
				{ value: 'cancelled', name: 'Cancelled' }
			]}
		/>
		<Button type="submit" size="sm" variant="outline" class="mt-4" form="read">
			{#if $delayed}
				<LoadingBtn name="Changing Status" />
			{:else}
				<SquarePen /> Change Status
			{/if}
		</Button>
		<input bind:value={$form.id} name="id" type="hidden" />
	</form>
</DialogComp>
