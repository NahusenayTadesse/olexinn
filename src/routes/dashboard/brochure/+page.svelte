<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Save, Video, Image as ImageIcon, AlertCircle } from '@lucide/svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { superForm } from 'sveltekit-superforms';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import { toast } from 'svelte-sonner';
	import FormCard from '$lib/formComponents/FormCard.svelte';

	let { data } = $props();

	const { form, errors, enhance, delayed, message } = superForm(data.form, {});

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
	<title>Brochure</title>
</svelte:head>

<main class="container mx-auto w-full! space-y-8 p-4">
	<div class="border-b pb-4">
		<h1 class="text-3xl font-bold tracking-tight">Brochure to be Downloaded</h1>
		<p class="text-muted-foreground">Manage Brochure to be Downloaded By Customers</p>
	</div>

	<section class="space-y-4 lg:col-span-7">
		<FormCard title="Brochure" className="w-full shadow-sm border">
			<form method="post" action="?/editGallery" use:enhance enctype="multipart/form-data">
				<InputComp label="" name="existing" type="hidden" {form} {errors} required={true} />
				<InputComp
					label="Brochure"
					name="brochure"
					type="file"
					image={data?.brochure ? data.brochure : ''}
					{form}
					{errors}
					required={true}
				/>

				<div class="flex justify-end pt-2">
					<Button type="submit" class="w-full px-8 sm:w-auto" size="lg">
						{#if $delayed}
							<LoadingBtn name="Saving Changes..." />
						{:else}
							<Save class="mr-2 h-4 w-4" /> Save Changes
						{/if}
					</Button>
				</div>
			</form>
		</FormCard>
	</section>
</main>
