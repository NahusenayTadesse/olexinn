<script>
	import '$lib/css/style.css';
	import Errors from '$lib/formComponents/Errors.svelte';
	import { Loader } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms/client';

	let { data } = $props();

	const { form, errors, enhance, delayed, allErrors } = superForm(data.form, {
		dataType: 'json',

		onUpdated({ form }) {
			if (form.message) {
				if (form.message.type === 'error') {
					toast.error(form.message.text);
				} else if (form.message.type === 'success') {
					toast.success(form.message.text);
				}
			}
		}
	});
</script>

{#snippet field(
	label = '',
	name = '',
	type = 'text',
	placeholder = '',
	required = false,
	step = '',
	min = '',
	max = ''
)}
	<div style="margin-bottom:1.75rem;">
		<label for={name} class="form-label">
			{label}
			{#if required}
				<span class="text-destructive">*</span>
			{/if}
		</label>

		{#if type === 'textarea'}
			<textarea
				id={name}
				{name}
				{placeholder}
				{required}
				bind:value={$form[name]}
				class="form-field"
				style="color-scheme:dark;"
				aria-invalid={$errors[name] ? 'true' : undefined}></textarea>
		{:else}
			<input
				id={name}
				{type}
				{name}
				{placeholder}
				{required}
				{min}
				{max}
				{step}
				bind:value={$form[name]}
				class="form-field"
				style="color-scheme:dark;"
				aria-invalid={$errors[name] ? 'true' : undefined}
			/>
		{/if}

		{#if $errors[name]}
			<p class="text-sm text-destructive">{$errors[name]}</p>
		{/if}
	</div>
{/snippet}

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="description"
		content="Hire Olex Inn for your private event — parties, brand events, club nights. Finsbury Park, North London. Full bar, sound setup, flexible layout."
	/>
	<title>Hire the Venue · Olex Inn London</title>
</svelte:head>

<!-- ══ HERO HEADER ════════════════════════════ -->
<div style="padding-top:3.75rem;">
	<div class="container" style="padding-top:4.5rem;padding-bottom:3rem;">
		<span class="eyebrow" style="margin-bottom:1.25rem;">Venue Hire</span>
		<h1
			style="font-size:clamp(3.5rem,11vw,8rem);line-height:0.92;font-weight:700;margin-bottom:1.75rem;"
		>
			A North London<br />Icon
		</h1>
		<h2
			style="font-family:'Inter',sans-serif;text-transform:none;font-weight:300;font-size:clamp(1rem,2.5vw,1.3rem);color:var(--zinc-300);letter-spacing:0;margin-bottom:1.25rem;max-width:44rem;line-height:1.65;"
		>
			An iconic North London venue for standout events
		</h2>
		<p
			style="color:var(--zinc-600);font-weight:300;font-size:0.9rem;line-height:1.85;max-width:40rem;margin-bottom:2rem;"
		>
			Olex Inn is a Finsbury Park venue rooted in music and community. The space is available for
			private and brand-led events — flexible layout, strong in-house setup, and an experienced
			team. Each event is delivered with care while preserving the character and energy the bar is
			known for.
		</p>
		{#if data?.brochure}
			<a href="/files/{data?.brochure}" download="Olex Inn Brochure" class="btn-outline"
				>Download Brochure</a
			>
		{/if}
	</div>
</div>

<!-- ══ IMAGE GRID ════════════════════════════ -->
{#if data?.gallery?.length}
	<div class="container" style="padding-bottom:5rem;">
		<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:3px;margin-bottom:3px;">
			<div class="img-placeholder" style="height:clamp(200px,32vw,420px);">
				{#if data.gallery[0]}
					<img
						src="/files/{data.gallery[0]}"
						loading="lazy"
						alt="Olex Inn venue"
						class="img-fluid"
					/>
				{/if}
			</div>

			<div style="display:grid;grid-template-rows:1fr 1fr;gap:3px;">
				<div class="img-placeholder">
					{#if data.gallery[1]}
						<img
							src="/files/{data.gallery[1]}"
							loading="lazy"
							alt="Olex Inn crowd"
							class="img-fluid"
						/>
					{/if}
				</div>

				<div class="img-placeholder">
					{#if data.gallery[2]}
						<img
							src="/files/{data.gallery[2]}"
							loading="lazy"
							alt="Olex Inn bar detail"
							class="img-fluid"
						/>
					{/if}
				</div>
			</div>

			<div style="display:grid;grid-template-rows:1fr 1fr;gap:3px;">
				<div class="img-placeholder">
					{#if data.gallery[3]}
						<img
							src="/files/{data.gallery[3]}"
							loading="lazy"
							alt="Olex Inn stage"
							class="img-fluid"
						/>
					{/if}
				</div>

				<div class="img-placeholder">
					{#if data.gallery[4]}
						<img
							src="/files/{data.gallery[4]}"
							loading="lazy"
							alt="Olex Inn interior"
							class="img-fluid"
						/>
					{/if}
				</div>
			</div>
		</div>

		<div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;">
			{#if data.gallery[5]}
				<div class="img-placeholder" style="height:clamp(140px,20vw,240px);">
					<img
						src="/files/{data.gallery[5]}"
						loading="lazy"
						alt="Olex Inn dance floor"
						class="img-fluid"
					/>
				</div>
			{/if}
			{#if data.gallery[6]}
				<div class="img-placeholder" style="height:clamp(140px,20vw,240px);">
					<img
						src="/files/{data.gallery[6]}"
						loading="lazy"
						alt="Olex Inn event night"
						class="img-fluid"
					/>
				</div>
			{/if}
		</div>
	</div>
{/if}

<!-- ══ VENUE SPACES ════════════════════════════ -->
<div class="container" style="padding-bottom:5rem;">
	<span class="eyebrow" style="margin-bottom:2.5rem;">Venue Spaces</span>
	{#each data.venues as venue (venue.id)}
		<div class="space-row">
			<div class="img-placeholder" style="height:clamp(200px,28vw,320px);">
				{#if venue.imgUrl}
					<img
						src="/files/{venue.imgUrl}"
						loading="lazy"
						alt="Olex Inn {venue.name}"
						class="img-fluid"
					/>
				{/if}
			</div>
			<div>
				<h2 style="font-size:clamp(1.75rem,4vw,2.75rem);line-height:1;margin-bottom:1rem;">
					{venue.name}
				</h2>
				<p
					style="color:var(--zinc-400);font-weight:300;font-size:0.9rem;line-height:1.85;margin-bottom:2rem;max-width:28rem;"
				>
					{venue.description}
				</p>
				<p class="eyebrow" style="margin-bottom:1rem;">Room Specifications</p>
				<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
					{#if venue.capacity}
						<div class="spec-box">
							<span class="spec-label">Capacity</span><span class="spec-value"
								>{venue.capacity}</span
							>
						</div>
					{/if}
					{#if venue.format}
						<div class="spec-box">
							<span class="spec-label">Format</span><span class="spec-value">{venue.format}</span>
						</div>
					{/if}
					{#if venue.hours}
						<div class="spec-box">
							<span class="spec-label">Hours</span><span class="spec-value">{venue.hours}</span>
						</div>
					{/if}
					{#if venue.live}
						<div class="spec-box">
							<span class="spec-label">Live</span><span class="spec-value">YES</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
<!-- ══ BOOKING FORM ════════════════════════════ -->
<div class="container" style="padding-bottom:6rem;">
	<div class="grid-2" style="gap:5rem;align-items:start;">
		<div>
			<span class="eyebrow" style="margin-bottom:1.5rem;">Request Booking</span>
			<h2 style="font-size:clamp(2rem,5vw,3.5rem);line-height:1;margin-bottom:1.5rem;">
				Book<br />The Venue
			</h2>
			<p
				style="color:var(--zinc-600);font-weight:300;font-size:0.9rem;line-height:1.85;margin-bottom:2.5rem;"
			>
				Tell us what you're planning — we'll come back to you within 48 hours.
			</p>
			<span class="eyebrow" style="margin-bottom:1.25rem;">What's Included</span>
			<div>
				<div class="include-row">
					<span
						class="text-gold"
						style="font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:0.1em;">01</span
					><span style="color:var(--zinc-400);font-size:0.875rem;font-weight:300;"
						>Full bar service & staff</span
					>
				</div>
				<div class="include-row">
					<span
						class="text-gold"
						style="font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:0.1em;">02</span
					><span style="color:var(--zinc-400);font-size:0.875rem;font-weight:300;"
						>Sound system & DJ booth</span
					>
				</div>
				<div class="include-row">
					<span
						class="text-gold"
						style="font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:0.1em;">03</span
					><span style="color:var(--zinc-400);font-size:0.875rem;font-weight:300;"
						>Dedicated event coordinator</span
					>
				</div>
				<div class="include-row">
					<span
						class="text-gold"
						style="font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:0.1em;">04</span
					><span style="color:var(--zinc-400);font-size:0.875rem;font-weight:300;"
						>Security & door management</span
					>
				</div>
				<div class="include-row">
					<span
						class="text-gold"
						style="font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:0.1em;">05</span
					><span style="color:var(--zinc-400);font-size:0.875rem;font-weight:300;"
						>Flexible layout — full venue or partial</span
					>
				</div>
			</div>
		</div>

		<div>
			<form use:enhance method="post" action="?/book" id="hire-form">
				<Errors allErrors={$allErrors} />
				<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 2rem;" class="form-half">
					<!-- <div style="margin-bottom:1.75rem;">
						<label class="form-label">First Name</label><input
							type="text"
							class="form-field"
							placeholder="Jane"
							required
						/>
					</div>
					<div style="margin-bottom:1.75rem;">
						<label class="form-label">Last Name</label><input
							type="text"
							class="form-field"
							placeholder="Smith"
							required
						/>
					</div> -->
					{@render field('First Name', 'firstName', 'text', 'Jane', true)}
					{@render field('Last Name', 'lastName', 'text', 'Smith', true)}
				</div>
				<!-- <div style="margin-bottom:1.75rem;">
					<label class="form-label">Email</label><input
						type="email"
						class="form-field"
						placeholder="jane@example.com"
						required
					/>
				</div>
				<div style="margin-bottom:1.75rem;">
					<label class="form-label">Phone</label><input
						type="tel"
						class="form-field"
						placeholder="+44 7700 000000"
					/>
				</div> -->
				{@render field('Email', 'email', 'email', 'jane@example.com', true)}
				{@render field('Phone', 'phone', 'tel', '+44 7700 000000', true)}
				<div style="margin-bottom:1.75rem;">
					<label for="eventType" class="form-label">Event Type</label>
					<select bind:value={$form.eventType} name="eventType" class="form-field" required>
						<option value="" disabled selected>Select an option</option>
						<option>Private Party</option>
						<option>Corporate / Brand Event</option>
						<option>Club Night / DJ Event</option>
						<option>Birthday</option>
						<option>Matchday / Sports Event</option>
						<option>Other</option>
					</select>
				</div>
				<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 2rem;" class="form-half">
					<!-- <div style="margin-bottom:1.75rem;">
						<label class="form-label">Event Date</label><input
							type="date"
							class="form-field"
							style="color-scheme:dark;"
						/>
					</div> -->

					{@render field('Event Date', 'eventDate', 'date', '', true)}
					{@render field('Expected Guests', 'expectedGuests', 'number', '', true)}
				</div>
				<!-- <div style="margin-bottom:2rem;">
					<label for="enquiry" class="form-label" style="margin-bottom:0.5rem;">Tell Us More</label
					><textarea
						id="enquiry"
						class="form-field"
						placeholder="Details, requirements, questions..."></textarea>
				</div> -->
				{@render field(
					'Tell Us More',
					'enquiry',
					'textarea',
					'Details, requirements, questions...',
					false
				)}
				<button
					form="hire-form"
					type="submit"
					class="btn-gold flex flex-row items-center gap-2"
					style="width:100%;"
				>
					{#if $delayed}
						<Loader class="animate-spin" />
					{/if}
					Send Enquiry</button
				>
			</form>

			<div
				id="hire-success"
				style="display:none;margin-top:1.5rem;padding:1.25rem;border:1px solid var(--gold);background:rgba(201,144,42,0.05);"
			>
				<span class="eyebrow" style="margin-bottom:0.5rem;">Enquiry Received</span>
				<p style="color:var(--zinc-400);font-size:0.875rem;font-weight:300;margin-top:0.5rem;">
					We'll be in touch within 48 hours. Or call us on <a
						href="tel:02037221060"
						style="color:#fff;">020 3722 1060</a
					>.
				</p>
			</div>
		</div>
	</div>
</div>

<!-- ══ FIND US + CONTACT ══════════════════════ -->
<div style="border-top:1px solid var(--border);">
	<div class="container" style="padding-top:4rem;padding-bottom:5rem;">
		<div class="grid-2" style="gap:4rem;">
			<div>
				<span class="eyebrow" style="margin-bottom:1.5rem;">Find Us</span>
				<h2 style="font-size:clamp(1.5rem,4vw,2.5rem);line-height:1.1;margin-bottom:1.5rem;">
					5 Station Place,<br />Finsbury Park,<br />London N4 2DH
				</h2>
				<a
					href="https://maps.google.com/?q=5+Station+Pl,+Finsbury+Park,+London+N4+2DH"
					target="_blank"
					rel="noopener"
					class="btn-ghost">Google Maps →</a
				>
			</div>
			<div>
				<div class="contact-row">
					<span class="eyebrow" style="margin-bottom:0.75rem;">Hire</span>
					<a
						href="mailto:events@olexinn.co.uk?subject=Venue%20Hire"
						class="contact-link"
						style="font-size:clamp(1.1rem,3vw,1.75rem);font-family:'Oswald',sans-serif;text-transform:uppercase;display:block;"
						>events@olexinn.co.uk</a
					>
				</div>
				<div class="contact-row">
					<span class="eyebrow" style="margin-bottom:0.75rem;">General Enquiries</span>
					<a
						href="mailto:info@olexinn.co.uk"
						class="contact-link"
						style="font-size:clamp(1.1rem,3vw,1.75rem);font-family:'Oswald',sans-serif;text-transform:uppercase;display:block;"
						>info@olexinn.co.uk</a
					>
				</div>
				<div class="contact-row">
					<span class="eyebrow" style="margin-bottom:0.75rem;">Phone</span>
					<a
						href="tel:02037221060"
						class="contact-link"
						style="font-size:clamp(1.1rem,3vw,1.75rem);font-family:'Oswald',sans-serif;text-transform:uppercase;display:block;"
						>020 3722 1060</a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.space-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: start;
		border-top: 1px solid var(--border);
		padding: 3rem 0;
	}
	.space-row:last-of-type {
		border-bottom: 1px solid var(--border);
	}
	.contact-row {
		border-top: 1px solid var(--border);
		padding: 1.5rem 0;
	}
	.contact-link {
		transition: color 0.2s;
	}
	.contact-link:hover {
		color: var(--gold);
	}
	.include-row {
		padding: 1rem 0;
		border-top: 1px solid var(--border);
		display: flex;
		gap: 1rem;
		align-items: baseline;
	}
	.include-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	@media (max-width: 768px) {
		.space-row {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.form-half {
			grid-template-columns: 1fr !important;
		}
	}
</style>
