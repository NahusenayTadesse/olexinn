<script>
	import '$lib/css/style.css';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="description"
		content="Find Olex Inn — 5 Station Place, Finsbury Park, London N4 2DH. 2 min walk from Finsbury Park station. 7 min from Emirates Stadium. Open until 4AM."
	/>
	<title>Find Us · Olex Inn London</title>
</svelte:head>

<!-- ══ HEADER ════════════════════════════════ -->
<div style="padding-top:3.75rem;">
	<div class="container" style="padding-top:4rem;padding-bottom:3rem;">
		<span class="eyebrow" style="margin-bottom:1.25rem;">Find Us</span>
		<h1
			style="font-size:clamp(3rem,10vw,7rem);line-height:0.92;font-weight:700;margin-bottom:1.5rem;"
		>
			A North London<br />Institution
		</h1>
		<p
			style="color:var(--zinc-400);font-weight:300;font-size:0.95rem;line-height:1.8;max-width:36rem;"
		>
			Steps from Finsbury Park station, minutes from the Emirates — we're where the night starts and
			where it ends.
		</p>
	</div>
</div>

<!-- ══ IMAGE GRID ════════════════════════════ -->
<div class="container" style="padding-bottom:4rem;">
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-bottom:3px;">
		<div class="img-placeholder" style="height:clamp(180px,28vw,340px);">
			<!-- Venue exterior -->
		</div>
		<div class="img-placeholder" style="height:clamp(180px,28vw,340px);">
			<!-- Interior wide shot -->
		</div>
	</div>
	<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;">
		<div class="img-placeholder" style="height:clamp(100px,16vw,200px);"><!-- Bar --></div>
		<div class="img-placeholder" style="height:clamp(100px,16vw,200px);"><!-- Crowd --></div>
		<div class="img-placeholder" style="height:clamp(100px,16vw,200px);"><!-- Stage --></div>
	</div>
</div>

<!-- ══ FIND US + CONTACT ══════════════════════ -->
<div class="container" style="padding-bottom:5rem;">
	<div class="grid-2" style="gap:4rem;align-items:start;">
		<!-- Left: Address + info -->
		<div>
			<span class="eyebrow" style="margin-bottom:1.5rem;">Address</span>
			<h2 style="font-size:clamp(1.5rem,4vw,2.5rem);line-height:1.1;margin-bottom:1.5rem;">
				5 Station Place,<br />Finsbury Park,<br />London N4 2DH
			</h2>
			<a
				href="https://maps.app.goo.gl/wpvNbMD6tG7ZyrrW9"
				target="_blank"
				rel="noopener"
				class="btn-gold"
				style="margin-bottom:2.5rem;">Get Directions →</a
			>

			<div style="margin-top:2.5rem;">
				<div class="info-row">
					<span class="info-label">Station</span>
					<span class="info-value">Finsbury Park · 2 min walk</span>
				</div>
				<div class="info-row">
					<span class="info-label">Emirates Stadium</span>
					<span class="info-value">7 min walk</span>
				</div>
				<div class="info-row">
					<span class="info-label">Hours</span>
					<span class="info-value">Open Until 4AM</span>
				</div>
				<div class="info-row">
					<span class="info-label">Price</span>
					<span class="info-value">£10 – 20</span>
				</div>
				<div class="info-row">
					<span class="info-label">Entry</span>
					<span class="info-value">Walk In · No Bookings</span>
				</div>
				<div class="info-row">
					<span class="info-label">Rating</span>
					<span class="info-value text-gold">★ 4.4 · 122 Reviews</span>
				</div>
			</div>
		</div>

		<!-- Right: Map + contact -->
		<div>
			<span class="eyebrow" style="margin-bottom:1.5rem;">Get In Touch</span>

			<div class="contact-row">
				<span class="eyebrow" style="margin-bottom:0.6rem;">Phone</span>
				<a
					href="tel:02037221060"
					class="contact-link"
					style="font-size:clamp(1.25rem,4vw,2rem);font-family:'Oswald',sans-serif;text-transform:uppercase;display:block;"
					>020 3722 1060</a
				>
			</div>
			<div class="contact-row">
				<span class="eyebrow" style="margin-bottom:0.6rem;">General Enquiries</span>
				<a
					href="mailto:info@olexinn.co.uk"
					class="contact-link"
					style="font-size:clamp(1rem,3vw,1.5rem);font-family:'Oswald',sans-serif;text-transform:uppercase;display:block;"
					>info@olexinn.co.uk</a
				>
			</div>
			<div class="contact-row" style="margin-bottom:1.5rem;">
				<span class="eyebrow" style="margin-bottom:0.6rem;">Private Hire & Events</span>
				<a
					href="mailto:events@olexinn.co.uk"
					class="contact-link"
					style="font-size:clamp(1rem,3vw,1.5rem);font-family:'Oswald',sans-serif;text-transform:uppercase;display:block;"
					>events@olexinn.co.uk</a
				>
			</div>

			<!-- Map embed -->
			<div class="map-wrap">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.2!2d-0.1044!3d51.5643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5+Station+Pl%2C+Finsbury+Park%2C+London+N4+2DH!5e0!3m2!1sen!2suk!4v1"
					width="100%"
					height="100%"
					style="border:0;position:absolute;top:0;left:0;width:100%;height:100%;filter:grayscale(100%) invert(85%) contrast(85%);"
					allowfullscreen=""
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Olex Inn on Google Maps"
				>
				</iframe>
			</div>
		</div>
	</div>
</div>

<!-- ══ TICKER ══════════════════════════════════ -->
<div class="ticker-wrap">
	<div class="ticker-inner">
		<span class="ticker-item">Finsbury Park · N4 2DH</span><span class="ticker-dot">·</span>
		<span class="ticker-item">Open Until 4AM</span><span class="ticker-dot">·</span>
		<span class="ticker-item">2 Min From Station</span><span class="ticker-dot">·</span>
		<span class="ticker-item">7 Min From Emirates</span><span class="ticker-dot">·</span>
		<span class="ticker-item">No Bookings</span><span class="ticker-dot">·</span>
		<span class="ticker-item">★ 4.4 on Google</span><span class="ticker-dot">·</span>
		<span class="ticker-item">Finsbury Park · N4 2DH</span><span class="ticker-dot">·</span>
		<span class="ticker-item">Open Until 4AM</span><span class="ticker-dot">·</span>
		<span class="ticker-item">2 Min From Station</span><span class="ticker-dot">·</span>
		<span class="ticker-item">7 Min From Emirates</span><span class="ticker-dot">·</span>
		<span class="ticker-item">No Bookings</span><span class="ticker-dot">·</span>
		<span class="ticker-item">★ 4.4 on Google</span><span class="ticker-dot">·</span>
	</div>
</div>

<style>
	.info-row {
		padding: 1.1rem 0;
		border-bottom: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}
	.info-row:first-child {
		border-top: 1px solid var(--border);
	}
	.info-label {
		font-family: 'Oswald', sans-serif;
		font-size: 0.6rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--zinc-600);
	}
	.info-value {
		font-family: 'Oswald', sans-serif;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		text-align: right;
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
	.map-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		background: var(--zinc-900);
		border: 1px solid var(--border);
		overflow: hidden;
	}
	@media (max-width: 480px) {
		.map-wrap {
			aspect-ratio: 1;
		}
	}
</style>
