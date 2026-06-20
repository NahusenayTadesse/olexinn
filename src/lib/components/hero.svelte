<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { CalendarHeartIcon, MapPinIcon, TrendingUpIcon } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut, elasticOut } from 'svelte/easing';

	const stats = [
		{
			label: 'Event Management',
			value: 'Premium',
			icon: CalendarHeartIcon,
			pos: 'top-[8%] right-[12%]',
			delay: 700,
			accent: '#FFB347'
		},
		{
			label: '4 Kilo Plaza',
			value: 'Venue',
			icon: MapPinIcon,
			pos: 'top-[42%] right-[3%]',
			delay: 900,
			accent: '#F2E1D1'
		},
		{
			label: 'Sales & Growth',
			value: 'Monetized',
			icon: TrendingUpIcon,
			pos: 'bottom-[12%] right-[35%]',
			delay: 1100,
			accent: '#7EB8A4'
		}
	];

	const images = ['/event (1).webp', '/event (2).webp', '/event (3).webp'];
	let currentIndex = $state(0);
	let mounted = $state(false);
	let titleVisible = $state(false);
	let particles: {
		x: number;
		y: number;
		size: number;
		speed: number;
		opacity: number;
		hue: number;
	}[] = $state([]);

	onMount(() => {
		mounted = true;
		setTimeout(() => (titleVisible = true), 100);

		// Generate floating particles
		particles = Array.from({ length: 40 }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 3 + 1,
			speed: Math.random() * 20 + 15,
			opacity: Math.random() * 0.5 + 0.1,
			hue: Math.random() > 0.5 ? 30 : 160
		}));

		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

<section class="hero relative min-h-dvh w-full overflow-hidden bg-[#060e20]">
	<!-- Animated gradient orbs -->
	<div class="orb orb-1" aria-hidden="true"></div>
	<div class="orb orb-2" aria-hidden="true"></div>
	<div class="orb orb-3" aria-hidden="true"></div>

	<!-- Noise texture -->
	<div class="noise" aria-hidden="true"></div>

	<!-- Grid lines -->
	<div class="grid-lines" aria-hidden="true"></div>

	<!-- Background image slideshow -->
	<div class="absolute inset-0 z-0">
		{#each images as img, i (img)}
			{#if currentIndex === i}
				<div
					transition:fade={{ duration: 1400 }}
					class="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat transition-transform duration-8000 ease-out"
					style="background-image: url('{img}'); animation: slowZoom 8s ease-out forwards;"
				></div>
			{/if}
		{/each}
		<!-- Strong directional gradient -->
		<div
			class="absolute inset-0 bg-linear-to-r from-[#060e20]/98 via-[#060e20]/75 to-[#060e20]/20"
		></div>
		<div
			class="absolute inset-0 bg-linear-to-t from-[#060e20]/80 via-transparent to-[#060e20]/40"
		></div>
	</div>

	<!-- Floating particles -->
	{#if mounted}
		<div class="particles pointer-events-none absolute inset-0 z-10" aria-hidden="true">
			{#each particles as p, i}
				<div
					class="particle absolute rounded-full"
					style="
						left: {p.x}%;
						top: {p.y}%;
						width: {p.size}px;
						height: {p.size}px;
						opacity: {p.opacity};
						background: hsl({p.hue}, 80%, 70%);
						animation: floatParticle {p.speed}s ease-in-out infinite alternate;
						animation-delay: -{i * 0.7}s;
					"
				></div>
			{/each}
		</div>
	{/if}

	<!-- Scanline accent bar -->
	<div class="scanline" aria-hidden="true"></div>

	<!-- Main content -->
	<div
		class="relative z-20 mx-auto flex min-h-dvh max-w-7xl flex-col justify-center px-6 py-4 lg:px-10"
	>
		<div class="grid gap-12 lg:grid-cols-12 lg:items-center">
			<!-- Left column: copy -->
			<div class="flex flex-col space-y-10 lg:col-span-7">
				{#if mounted}
					<!-- Eyebrow tag -->
					<div in:fly={{ y: 30, duration: 700, delay: 100, easing: cubicOut }}>
						<div class="eyebrow-tag inline-flex items-center gap-3 rounded-full px-5 py-2">
							<span class="pulse-dot"></span>
							<span class="text-[11px] font-black tracking-[0.35em] text-[#FFB347] uppercase">
								Ahead of the curve · Addis Ababa
							</span>
						</div>
					</div>

					<!-- Main headline -->
					<div in:fly={{ y: 40, duration: 800, delay: 250, easing: cubicOut }}>
						<h1 class="headline relative">
							<span
								class="block text-[clamp(4rem,11vw,8.5rem)] leading-[0.85] font-black tracking-tighter text-white"
							>
								YEBEHIR
							</span>
							<span
								class="ventures-word mt-2 ml-1 block text-[clamp(1.8rem,5vw,3.8rem)] font-light tracking-[0.15em] text-[#F2E1D1]/70"
							>
								VENTURES
							</span>
							<!-- Decorative underline stroke -->
							<span class="stroke-line" aria-hidden="true"></span>
						</h1>
					</div>

					<!-- Description card -->
					<div
						in:fly={{ y: 30, duration: 800, delay: 450, easing: cubicOut }}
						class="max-w-lg space-y-5"
					>
						<p class="text-xl leading-relaxed font-semibold text-zinc-200">
							"We Create, Manage &amp; Monetize Events in Addis"
						</p>

						<div class="desc-card rounded-xl p-5">
							<p class="mb-2 text-[11px] font-black tracking-[0.25em] text-[#FFB347] uppercase">
								The Experience Agency
							</p>
							<p class="text-base leading-relaxed text-zinc-300">
								We don't just organize events — we craft experiences, unlock revenue, and bridge
								brands with audiences that matter.
							</p>
						</div>
					</div>

					<!-- CTAs -->
					<div
						in:fly={{ y: 30, duration: 800, delay: 600, easing: cubicOut }}
						class="flex flex-wrap gap-4"
					>
						<Button href="/services" size="lg" variant="default">
							Our Services
							<svg
								class="size-4 transition-transform duration-300 group-hover:translate-x-1"
								viewBox="0 0 16 16"
								fill="none"
							>
								<path
									d="M3 8h10M9 4l4 4-4 4"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</Button>
						<Button href="/quote" size="lg" variant="outline">Request a Quote</Button>
					</div>

					<!-- Image dot indicators -->
					<div in:fade={{ duration: 600, delay: 900 }} class="mt-2 flex items-center gap-3">
						{#each images as _, i}
							<button
								class="dot-indicator {currentIndex === i ? 'active' : ''}"
								onclick={() => (currentIndex = i)}
								aria-label="Go to slide {i + 1}"
							></button>
						{/each}
						<span class="ml-2 text-xs tracking-widest text-zinc-500"
							>{String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(
								2,
								'0'
							)}</span
						>
					</div>
				{/if}
			</div>

			<!-- Right column: floating stat cards -->
			<div class="relative hidden h-150 lg:col-span-5 lg:block">
				<!-- Decorative circle rings -->
				<div class="ring-1-style ring" aria-hidden="true"></div>
				<div class="ring-2-style ring" aria-hidden="true"></div>

				{#if mounted}
					{#each stats as stat, i (stat.label)}
						<div
							class="stat-card absolute {stat.pos}"
							in:fly={{ x: 60, y: -10, duration: 700, delay: stat.delay, easing: elasticOut }}
						>
							<div class="stat-inner group" style="--accent: {stat.accent}">
								<div
									class="stat-icon-wrap"
									style="background: {stat.accent}22; border-color: {stat.accent}44"
								>
									<stat.icon class="size-5" style="color: {stat.accent}" />
								</div>
								<div>
									<p class="text-2xl leading-tight font-black text-white">{stat.value}</p>
									<p class="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
										{stat.label}
									</p>
								</div>
								<!-- Animated accent bar -->
								<div class="stat-accent-bar" style="background: {stat.accent}"></div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<!-- Bottom scroll indicator -->
	<div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
		<div class="scroll-line"></div>
		<span class="text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Scroll</span>
	</div>
</section>

<style>
	/* ── Orbs ─────────────────────────────────── */
	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		z-index: 1;
	}
	.orb-1 {
		width: 600px;
		height: 600px;
		top: -150px;
		left: -200px;
		background: radial-gradient(circle, rgba(255, 179, 71, 0.12) 0%, transparent 70%);
		animation: driftOrb1 18s ease-in-out infinite alternate;
	}
	.orb-2 {
		width: 500px;
		height: 500px;
		bottom: -100px;
		right: -100px;
		background: radial-gradient(circle, rgba(126, 184, 164, 0.1) 0%, transparent 70%);
		animation: driftOrb2 22s ease-in-out infinite alternate;
	}
	.orb-3 {
		width: 350px;
		height: 350px;
		top: 40%;
		left: 40%;
		background: radial-gradient(circle, rgba(242, 225, 209, 0.07) 0%, transparent 70%);
		animation: driftOrb3 14s ease-in-out infinite alternate;
	}
	@keyframes driftOrb1 {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(60px, 40px) scale(1.15);
		}
	}
	@keyframes driftOrb2 {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(-50px, -60px) scale(1.1);
		}
	}
	@keyframes driftOrb3 {
		from {
			transform: translate(0, 0) scale(1) rotate(0deg);
		}
		to {
			transform: translate(30px, -40px) scale(1.2) rotate(15deg);
		}
	}

	/* ── Noise texture ────────────────────────── */
	.noise {
		position: absolute;
		inset: 0;
		z-index: 2;
		opacity: 0.035;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 200px 200px;
	}

	/* ── Grid lines ───────────────────────────── */
	.grid-lines {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: linear-gradient(
			to right,
			transparent,
			rgba(0, 0, 0, 0.3) 30%,
			rgba(0, 0, 0, 0.3) 70%,
			transparent
		);
	}

	/* ── Scanline ─────────────────────────────── */
	.scanline {
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
		z-index: 25;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 179, 71, 0.6) 30%,
			rgba(242, 225, 209, 0.8) 50%,
			rgba(255, 179, 71, 0.6) 70%,
			transparent 100%
		);
		animation: scanMove 6s ease-in-out infinite;
		filter: blur(1px);
	}
	@keyframes scanMove {
		0% {
			top: -2px;
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			top: 100%;
			opacity: 0;
		}
	}

	/* ── Particles ────────────────────────────── */
	@keyframes floatParticle {
		from {
			transform: translateY(0) translateX(0);
		}
		to {
			transform: translateY(-30px) translateX(15px);
		}
	}

	/* ── Slowzoom on images ───────────────────── */
	@keyframes slowZoom {
		from {
			transform: scale(1.1);
		}
		to {
			transform: scale(1);
		}
	}

	/* ── Eyebrow tag ──────────────────────────── */
	.eyebrow-tag {
		background: rgba(255, 179, 71, 0.08);
		border: 1px solid rgba(255, 179, 71, 0.25);
		backdrop-filter: blur(8px);
	}
	.pulse-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ffb347;
		box-shadow: 0 0 0 0 rgba(255, 179, 71, 0.6);
		animation: pulse 2s ease-out infinite;
		flex-shrink: 0;
	}
	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(255, 179, 71, 0.6);
		}
		70% {
			box-shadow: 0 0 0 8px rgba(255, 179, 71, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 179, 71, 0);
		}
	}

	/* ── Headline ─────────────────────────────── */
	.headline {
		text-shadow:
			0 0 80px rgba(255, 179, 71, 0.08),
			0 20px 40px rgba(0, 0, 0, 0.6);
	}
	.ventures-word {
		letter-spacing: 0.18em;
	}
	.stroke-line {
		display: block;
		height: 3px;
		width: 120px;
		margin-top: 16px;
		background: linear-gradient(90deg, #ffb347 0%, #f2e1d1 50%, transparent 100%);
		border-radius: 2px;
		animation: expandLine 1s ease-out 0.8s both;
	}
	@keyframes expandLine {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 120px;
			opacity: 1;
		}
	}

	/* ── Description card ─────────────────────── */
	.desc-card {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-left: 4px solid #ffb347;
		backdrop-filter: blur(12px);
		transition:
			background 0.3s ease,
			border-color 0.3s ease;
	}
	.desc-card:hover {
		background: rgba(255, 255, 255, 0.07);
	}

	/* ── CTA buttons ──────────────────────────── */
	.cta-primary {
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 14px 32px;
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		color: #060e20;
		background: linear-gradient(135deg, #ffb347 0%, #f2e1d1 100%);
		overflow: hidden;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.3s ease;
		box-shadow: 0 0 0 0 rgba(255, 179, 71, 0.4);
	}
	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow:
			0 8px 32px rgba(255, 179, 71, 0.4),
			0 0 0 4px rgba(255, 179, 71, 0.15);
	}
	.cta-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #ffd580 0%, #ffb347 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
		border-radius: 999px;
	}
	.cta-primary:hover .cta-glow {
		opacity: 1;
	}

	.cta-outline {
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 14px 32px;
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #f2e1d1;
		background: transparent;
		border: 1.5px solid rgba(242, 225, 209, 0.3);
		text-decoration: none;
		transition: all 0.25s ease;
		backdrop-filter: blur(8px);
	}
	.cta-outline:hover {
		background: rgba(242, 225, 209, 0.08);
		border-color: rgba(242, 225, 209, 0.6);
		transform: translateY(-2px);
	}

	/* ── Dot indicators ───────────────────────── */
	.dot-indicator {
		width: 24px;
		height: 3px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		cursor: pointer;
		transition: all 0.4s ease;
	}
	.dot-indicator.active {
		width: 40px;
		background: #ffb347;
		box-shadow: 0 0 8px rgba(255, 179, 71, 0.6);
	}

	/* ── Decorative rings ─────────────────────── */
	.ring {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(255, 179, 71, 0.08);
		pointer-events: none;
	}
	.ring-1-style {
		width: 360px;
		height: 360px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: spinRing 30s linear infinite;
	}
	.ring-2-style {
		width: 480px;
		height: 480px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-color: rgba(126, 184, 164, 0.06);
		animation: spinRing 45s linear infinite reverse;
	}
	@keyframes spinRing {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	/* ── Stat cards ───────────────────────────── */
	.stat-card {
		/* Svelte inline style overrides position; these handle the Tailwind-like classes */
	}

	/* Reparse Tailwind-style pos strings inline; overriding with real positions below */
	/* The component uses Tailwind's JIT classes — ensure they're included in your config */

	.stat-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 20px 22px;
		border-radius: 18px;
		background: rgba(6, 14, 32, 0.75);
		border: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(20px);
		box-shadow:
			0 24px 64px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
		overflow: hidden;
		min-width: 160px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		animation: floatCard 6s ease-in-out infinite alternate;
	}
	.stat-card:nth-child(2) .stat-inner {
		animation-delay: -2s;
	}
	.stat-card:nth-child(3) .stat-inner {
		animation-delay: -4s;
	}

	.stat-inner:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow:
			0 32px 80px rgba(0, 0, 0, 0.6),
			0 0 0 1px var(--accent, #ffb347) 44,
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}
	@keyframes floatCard {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-10px);
		}
	}

	.stat-icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: 10px;
		border: 1px solid;
		flex-shrink: 0;
	}

	.stat-accent-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		opacity: 0.6;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s ease;
	}
	.stat-inner:hover .stat-accent-bar {
		transform: scaleX(1);
	}

	/* ── Scroll indicator ─────────────────────── */
	.scroll-line {
		width: 1px;
		height: 60px;
		background: linear-gradient(to bottom, #ffb347, transparent);
		animation: scrollPulse 2s ease-in-out infinite;
	}
	@keyframes scrollPulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scaleY(1);
		}
		50% {
			opacity: 0.8;
			transform: scaleY(0.8) translateY(8px);
		}
	}

	/* ── Global overrides ─────────────────────── */
	:global(.hero h1) {
		font-family: inherit;
	}
</style>
