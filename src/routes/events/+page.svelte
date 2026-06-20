<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/css/style.css';

	let { data }: { data: PageData } = $props();

	let activeFilter = $state('all');

	const filteredEvents = $derived(
		data.eventList.filter((event) => activeFilter === 'all' || event.types.includes(activeFilter))
	);

	const tickerItems = $derived(
		Array.from(new Set(data.eventList.flatMap((event) => event.genres)))
	);
</script>

<svelte:head>
	<title>What's On · Olex Inn London</title>
	<meta
		name="description"
		content="What's On at Olex Inn Finsbury Park — Jazz, Afrobeats, Hip Hop, R&B, live performances and open nights. Check upcoming events and get tickets."
	/>
</svelte:head>

<div style="padding-top:3.75rem;">
	<div class="container" style="padding-top:4rem;padding-bottom:3rem;">
		<span class="eyebrow" style="margin-bottom:1.25rem;">Programme</span>
		<h1
			style="font-size:clamp(3rem,10vw,7rem);line-height:0.92;font-weight:700;margin-bottom:1.5rem;"
		>
			What's On
		</h1>
		<p
			style="color:var(--zinc-400);font-weight:300;font-size:0.95rem;max-width:36rem;line-height:1.8;"
		>
			Jazz sets, Afrobeats nights, Hip Hop, R&B and live performances — 2 to 3 times a week. Free
			nights and ticketed events, listed together. Walk in or get your tickets in advance.
		</p>
	</div>
</div>

<div class="ticker-wrap">
	<div class="ticker-wrap">
		<div class="ticker-inner">
			{#each [...tickerItems, ...tickerItems] as item}
				<span class="ticker-item">{item}</span><span class="ticker-dot">·</span>
			{/each}
		</div>
	</div>
</div>

<section class="section">
	<div class="container">
		<div
			style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;margin-bottom:3rem;"
		>
			<h2 style="font-size:clamp(1.25rem,3vw,1.75rem);">All Events</h2>
			<div class="filter-bar" aria-label="Filter events">
				{#each data.filters as filter}
					<button
						class="filter-btn"
						class:active={activeFilter === filter.value}
						type="button"
						onclick={() => (activeFilter = filter.value)}
					>
						{filter.label}
					</button>
				{/each}
			</div>
		</div>

		{#if filteredEvents.length}
			<div>
				{#each filteredEvents as event}
					<div class="event-row">
						<div class="event-date-block">
							<div class="event-date-day">{event.day}</div>
							<div class="event-date-num">{event.num}</div>
							<div class="event-date-mon">{event.mon}</div>
						</div>

						<div>
							<div class="event-title">{event.title}</div>
							<div class="event-meta">{event.meta}</div>

							<div class="genre-tags" style="margin-top:0.5rem;">
								{#each event.genres as genre}
									<span class="genre-tag">{genre}</span>
								{/each}
							</div>
						</div>

						<div class="event-actions" style="display:flex;align-items:center;gap:1rem;">
							<span class={`event-tag ${event.tagClass}`}>{event.tag}</span>

							{#if event.ticketHref}
								<a href={event.ticketHref} class="btn-ghost" style="font-size:0.7rem;">Tickets →</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty-state">No events match this filter right now</div>
		{/if}
	</div>
</section>

<section class="section-sm bg-dark border-top border-bottom">
	<div class="container" style="text-align:center;">
		<p class="eyebrow" style="margin-bottom:0.75rem;">No Plans?</p>
		<h2 style="font-size:clamp(1.5rem,4vw,2.5rem);margin-bottom:0.75rem;">Just Walk In.</h2>
		<p style="color:var(--zinc-400);font-weight:300;font-size:0.875rem;">
			No guest list. No booking. We're open — come through.
		</p>
		<div style="margin-top:1.5rem;">
			<a
				href="https://maps.app.goo.gl/wpvNbMD6tG7ZyrrW9"
				target="_blank"
				rel="noopener"
				class="btn-ghost">Get Directions →</a
			>
		</div>
	</div>
</section>

<style>
	.filter-bar {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.filter-btn {
		font-family: 'Oswald', sans-serif;
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		padding: 0.5rem 1.1rem;
		border: 1px solid var(--zinc-800);
		color: var(--zinc-600);
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
	}

	.filter-btn:hover {
		border-color: var(--zinc-600);
		color: var(--zinc-300);
	}

	.filter-btn.active {
		border-color: var(--gold);
		color: var(--gold);
	}

	.genre-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.genre-tag {
		font-size: 0.65rem;
		font-family: 'Oswald', sans-serif;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		border: 1px solid var(--zinc-800);
		color: var(--zinc-600);
		padding: 0.2rem 0.5rem;
	}

	.empty-state {
		padding: 4rem 0;
		text-align: center;
		color: var(--zinc-700);
		font-family: 'Oswald', sans-serif;
		font-size: 0.8rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
</style>
