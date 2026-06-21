<script>
	import '$lib/css/style.css';
	let { data } = $props();

	// const events = [
	// 	{
	// 		day: 'Thu',
	// 		num: '24',
	// 		mon: 'Jul',
	// 		title: 'Jazz & Soul Night',
	// 		meta: 'Live performance · Doors 8PM · Free before 9PM',
	// 		tag: 'Free',
	// 		tagClass: 'free'
	// 	},
	// 	{
	// 		day: 'Fri',
	// 		num: '25',
	// 		mon: 'Jul',
	// 		title: 'Afrobeats Friday',
	// 		meta: 'DJ Night · Doors 9PM · Until 4AM',
	// 		tag: 'Ticketed · £10',
	// 		tagClass: 'ticketed',
	// 		ticketHref: '/events'
	// 	},
	// 	{
	// 		day: 'Sat',
	// 		num: '26',
	// 		mon: 'Jul',
	// 		title: 'Hip Hop Saturdays',
	// 		meta: 'DJ Night · Doors 10PM · Until 4AM',
	// 		tag: 'Ticketed · £12',
	// 		tagClass: 'ticketed',
	// 		ticketHref: '/events'
	// 	},
	// 	{
	// 		day: 'Tue',
	// 		num: '29',
	// 		mon: 'Jul',
	// 		title: 'Open Mic Night',
	// 		meta: 'Live performances · Doors 7PM · Walk in welcome',
	// 		tag: 'Free',
	// 		tagClass: 'free'
	// 	},
	// 	{
	// 		day: 'Sat',
	// 		num: '02',
	// 		mon: 'Aug',
	// 		title: 'R&B & Dancehall Night',
	// 		meta: 'DJ Night · Doors 9PM · Until 4AM',
	// 		tag: 'Ticketed · £10',
	// 		tagClass: 'ticketed',
	// 		ticketHref: '/events'
	// 	}
	// ];

	const tickerItems = [
		'Finsbury Park',
		'Jazz · Afrobeats · Hip Hop · R&B · Live Music',
		'Open Until 4AM',
		'No Bookings — Walk In',
		'★ 4.4 on Google',
		'Near Emirates Stadium'
	];

	const events = $derived(data?.eventList);
	const barSpecs = [
		{ label: 'Open Until', value: '4AM' },
		{ label: 'Spend', value: '£10–20' },
		{ label: 'Rating', value: '★ 4.4', gold: true },
		{ label: 'Entry', value: 'Walk In' }
	];

	const matchdaySpecs = [
		{ label: 'Games From', value: '12PM' },
		{ label: 'Distance', value: '7 Min Walk' },
		{ label: 'Entry', value: 'Walk In' }
	];

	// const galleryItems = ['crowd', 'performer', 'bar detail', 'late night'];

	let sliderContainer = $state(null);
	let animationFrame = $state(null);
	let isPaused = $state(false);
	let isDragging = $state(false);
	let startX = $state(0);
	let startScrollLeft = $state(0);

	const galleryItems = $derived(data?.gallery ?? []);
	const extendedItems = $derived([...galleryItems, ...galleryItems]);

	const sliderSpeed = 0.35;

	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	$effect(() => {
		const container = sliderContainer;

		if (!container || galleryItems.length <= 1 || prefersReducedMotion) return;

		const animate = () => {
			if (!isPaused && !isDragging) {
				container.scrollLeft += sliderSpeed;

				const loopPoint = container.scrollWidth / 2;

				if (container.scrollLeft >= loopPoint) {
					container.scrollLeft -= loopPoint;
				}
			}

			animationFrame = requestAnimationFrame(animate);
		};

		const pause = () => {
			isPaused = true;
		};

		const resume = () => {
			isPaused = false;
		};

		const handlePointerDown = (event) => {
			isDragging = true;
			isPaused = true;
			startX = event.clientX;
			startScrollLeft = container.scrollLeft;
			container.setPointerCapture?.(event.pointerId);
		};

		const handlePointerMove = (event) => {
			if (!isDragging) return;

			const distance = event.clientX - startX;
			container.scrollLeft = startScrollLeft - distance;
		};

		const handlePointerUp = () => {
			isDragging = false;
			isPaused = false;
		};

		container.addEventListener('mouseenter', pause);
		container.addEventListener('mouseleave', resume);
		container.addEventListener('focusin', pause);
		container.addEventListener('focusout', resume);

		container.addEventListener('pointerdown', handlePointerDown);
		container.addEventListener('pointermove', handlePointerMove);
		container.addEventListener('pointerup', handlePointerUp);
		container.addEventListener('pointercancel', handlePointerUp);
		container.addEventListener('pointerleave', handlePointerUp);

		animationFrame = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationFrame);

			container.removeEventListener('mouseenter', pause);
			container.removeEventListener('mouseleave', resume);
			container.removeEventListener('focusin', pause);
			container.removeEventListener('focusout', resume);

			container.removeEventListener('pointerdown', handlePointerDown);
			container.removeEventListener('pointermove', handlePointerMove);
			container.removeEventListener('pointerup', handlePointerUp);
			container.removeEventListener('pointercancel', handlePointerUp);
			container.removeEventListener('pointerleave', handlePointerUp);
		};
	});
</script>

<svelte:head>
	<title>Olex Inn London — Bar & Live Music, Finsbury Park</title>
	<meta
		name="description"
		content="Olex Inn — Bar and live music venue in Finsbury Park, North London. Jazz, Afrobeats, Hip Hop, live performances. Open until 4AM. 7 min from Emirates Stadium."
	/>
	<meta
		name="keywords"
		content="bar Finsbury Park, live music North London, bar near Emirates Stadium, Arsenal matchday bar, jazz bar London, Afrobeats London, late bar N4"
	/>
</svelte:head>

<section
	style="height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 1.5rem;"
>
	<div class="img-placeholder" style="position:absolute;inset:0;z-index:0;">
		<div
			style="position:absolute;inset:0;background:linear-gradient(135deg,#18181b 0%,#0a0a0a 60%,#1a1208 100%);"
		></div>
	</div>

	<div style="position:absolute;inset:0;background:rgba(0,0,0,0.55);z-index:1;"></div>
	<div
		style="position:absolute;bottom:0;left:0;right:0;height:12rem;background:linear-gradient(to top,#0a0a0a,transparent);z-index:2;"
	></div>

	<div style="position:relative;z-index:3;max-width:50rem;">
		<p class="eyebrow fade-up" style="margin-bottom:1.25rem;">Finsbury Park · Open Until 4AM</p>
		<h1
			class="fade-up-2"
			style="font-size:clamp(3.5rem,12vw,8rem);line-height:0.92;font-weight:700;letter-spacing:-0.02em;"
		>
			Live Music.<br />Late Nights.<br />Walk In.
		</h1>
		<p
			class="fade-up-3"
			style="margin-top:1.5rem;font-size:clamp(0.9rem,2vw,1.1rem);color:var(--zinc-300);font-weight:300;line-height:1.75;max-width:32rem;margin-left:auto;margin-right:auto;"
		>
			Jazz sets. Afrobeats nights. Hip Hop. R&B. Live performances 2–3 times a week — and a bar
			worth coming to on its own.
		</p>
		<div
			class="fade-up-3"
			style="margin-top:2rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;"
		>
			<a href="/events" class="btn-gold">What's On</a>
			<a href="/contact" class="btn-outline">Find Us</a>
		</div>
	</div>

	<div
		style="position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);z-index:3;display:flex;flex-direction:column;align-items:center;gap:0.5rem;opacity:0.35;"
	>
		<span
			style="font-family:'Oswald',sans-serif;font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:#fff;"
			>Scroll</span
		>
		<div style="width:1px;height:2.5rem;background:rgba(255,255,255,0.3);"></div>
	</div>
</section>

<section class="section" style="padding-top:4rem;">
	<div class="container">
		<div
			style="display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem;"
		>
			<div>
				<span class="eyebrow" style="margin-bottom:0.75rem;">Coming Up</span>
				<h2 style="font-size:clamp(1.75rem,5vw,3rem);line-height:1;">What's On</h2>
			</div>
			<a href="/events" class="btn-ghost">Full Programme →</a>
		</div>

		{#each events as event (event.id)}
			<div class="event-row">
				<div class="event-date-block">
					<div class="event-date-day">{event.day}</div>
					<div class="event-date-num">{event.num}</div>
					<div class="event-date-mon">{event.mon}</div>
				</div>
				<div>
					<div class="event-title">{event.title}</div>
					<div class="event-meta">{event.meta}</div>
				</div>
				<div class="event-actions" style="display:flex;align-items:center;gap:1rem;">
					<span class={`event-tag ${event.tagClass}`}>{event.tag}</span>
					{#if event.ticketHref}
						<a href={event.ticketHref} class="btn-ghost" style="font-size:0.7rem;">Tickets →</a>
					{/if}
				</div>
			</div>
		{/each}

		<div style="margin-top:2rem;text-align:center;">
			<a href="/events" class="btn-outline">See All Events</a>
		</div>
	</div>
</section>

<div class="ticker-wrap">
	<div class="ticker-inner">
		{#each [...tickerItems, ...tickerItems] as item}
			<span class="ticker-item">{item}</span><span class="ticker-dot">·</span>
		{/each}
	</div>
</div>

<section class="section bg-dark" id="the-bar">
	<div class="container">
		<div class="grid-2" style="align-items:center;gap:4rem;">
			<div class={data?.mainImage ? '' : 'img-placeholder'} style="height:clamp(280px,40vw,480px);">
				{#if data?.mainImage}
					<img src="/files/{data.mainImage}" loading="lazy" alt="Main" class="img-fluid" />
				{/if}
			</div>

			<div>
				<span class="eyebrow" style="margin-bottom:1.25rem;">The Bar</span>
				<h2 style="font-size:clamp(2rem,5vw,3.5rem);line-height:1;margin-bottom:1.5rem;">
					Finsbury Park's<br />Late Night Spot
				</h2>
				<p
					style="color:var(--zinc-400);font-weight:300;line-height:1.85;font-size:0.95rem;margin-bottom:1.25rem;"
				>
					Olex Inn has been the heartbeat of Finsbury Park nights for years. A proper bar — full
					drinks service, good music, open late — with live performances woven through the week.
				</p>
				<p
					style="color:var(--zinc-400);font-weight:300;line-height:1.85;font-size:0.95rem;margin-bottom:2rem;"
				>
					No dress code. No guest list. No fuss. Just show up.
				</p>

				<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:2rem;">
					{#each barSpecs as spec}
						<div class="spec-box">
							<span class="spec-label">{spec.label}</span>
							<span class="spec-value" class:text-gold={spec.gold}>{spec.value}</span>
						</div>
					{/each}
				</div>

				<a href="/contact" class="btn-ghost">Find Us →</a>
			</div>
		</div>
	</div>
</section>

<section class="gallery-slider" aria-label="Venue gallery">
	<div bind:this={sliderContainer} class="gallery-track">
		{#each extendedItems as item, index}
			<figure class="gallery-card" aria-hidden={index >= galleryItems.length}>
				{#if item}
					<img src="/files/{item}" loading="lazy" alt="Olex Inn venue gallery" draggable="false" />
				{/if}
			</figure>
		{/each}
	</div>
</section>

<!-- <section class="section">
	<div class="container">
		<div class="grid-2" style="align-items:center;gap:4rem;">
			<div>
				<span class="eyebrow" style="margin-bottom:1.25rem;">Matchday</span>
				<h2 style="font-size:clamp(1.75rem,4vw,2.75rem);line-height:1.05;margin-bottom:1.25rem;">
					7 Minutes<br />From the Emirates
				</h2>
				<div
					style="display:inline-flex;align-items:center;gap:0.6rem;border:1px solid var(--gold);padding:0.5rem 1rem;margin-bottom:1.25rem;"
				>
					<span
						style="width:7px;height:7px;background:var(--gold);border-radius:50%;display:block;animation:pulse 1.5s ease-in-out infinite;flex-shrink:0;"
					></span>
					<span
						style="font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);"
						>Showing Live · All Major Games</span
					>
				</div>
				<p
					style="color:var(--zinc-400);font-weight:300;line-height:1.85;font-size:0.95rem;margin-bottom:1.25rem;"
				>
					Watch the game live at the bar — every Arsenal match and major fixture shown on screen
					during the day. Cold drinks, good crowd, no booking needed.
				</p>
				<p
					style="color:var(--zinc-400);font-weight:300;line-height:1.85;font-size:0.95rem;margin-bottom:2rem;"
				>
					7 minutes from the Emirates. The natural stop before kick-off, at half time, or long after
					the final whistle.
				</p>
				<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:2rem;">
					{#each matchdaySpecs as spec}
						<div class="spec-box">
							<span class="spec-label">{spec.label}</span><span class="spec-value"
								>{spec.value}</span
							>
						</div>
					{/each}
				</div>
				<a href="/contact" class="btn-ghost">Get Directions →</a>
			</div>

			<div class="img-placeholder" style="height:clamp(240px,35vw,380px);"></div>
		</div>
	</div>
</section> -->

<section class="section bg-dark border-top border-bottom">
	<div class="container" style="text-align:center;max-width:44rem;margin:0 auto;">
		<span class="eyebrow" style="margin-bottom:1.25rem;">Venue Hire</span>
		<h2 style="font-size:clamp(2rem,6vw,4rem);line-height:1;margin-bottom:1.25rem;">
			Book the Venue
		</h2>
		<p
			style="color:var(--zinc-400);font-weight:300;font-size:0.95rem;line-height:1.85;margin-bottom:2rem;"
		>
			Private parties, brand events, club nights. Flexible layout, full sound setup, in-house team.
			We make it happen.
		</p>
		<a href="/hire" class="btn-gold">Enquire About Hire</a>
	</div>
</section>

<style>
	.gallery-slider {
		width: 100%;
		padding: clamp(1rem, 3vw, 2rem) 0;
		overflow: hidden;
		background: #0a0a0a;
	}

	.gallery-track {
		display: flex;
		gap: clamp(0.75rem, 2vw, 1.25rem);
		overflow-x: auto;
		padding: 0 clamp(1rem, 4vw, 3rem);
		scrollbar-width: none;
		cursor: grab;
		user-select: none;
		-webkit-overflow-scrolling: touch;
	}

	.gallery-track::-webkit-scrollbar {
		display: none;
	}

	.gallery-track:active {
		cursor: grabbing;
	}

	.gallery-track:focus-visible {
		outline: 1px solid var(--gold);
		outline-offset: 0.5rem;
	}

	.gallery-card {
		position: relative;
		flex: 0 0 clamp(220px, 28vw, 420px);
		height: clamp(180px, 24vw, 320px);
		margin: 0;
		overflow: hidden;
		border-radius: 1.1rem;
		background: #18181b;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
	}

	.gallery-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent 55%),
			linear-gradient(to right, rgba(255, 255, 255, 0.08), transparent 35%);
		pointer-events: none;
	}

	.gallery-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transform: scale(1.03);
		transition:
			transform 500ms ease,
			filter 500ms ease;
	}

	.gallery-card:hover img {
		transform: scale(1.08);
		filter: brightness(1.08);
	}

	@media (prefers-reduced-motion: reduce) {
		.gallery-track {
			scroll-snap-type: x mandatory;
		}

		.gallery-card {
			scroll-snap-align: start;
		}

		.gallery-card img {
			transition: none;
		}
	}
</style>
