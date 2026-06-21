<script lang="ts">
	import './layout.css';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	let navOpen = $state(false);
	let cookiePreference = $state(null);

	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';

	const flash = getFlash(page, { clearAfterMs: 5000 });

	import { ModeWatcher } from 'mode-watcher';

	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	async function notifyBrowser(title: string, body: string) {
		if (!('Notification' in window)) return; // Safari iOS etc.

		if (Notification.permission === 'granted') {
			new Notification(title, { body, icon: '/logo.png' });
		} else if (Notification.permission !== 'denied') {
			const perm = await Notification.requestPermission();

			if (perm === 'granted') new Notification(title, { body, icon: '/logo.png' });
		}
	}

	$effect(() => {
		if (!$flash) return;
		if (page.data.flash?.type === 'success') toast.success($flash.message);
		if (page.data.flash?.type === 'error') toast.error($flash?.message);

		if (Notification.permission === 'granted') {
			notifyBrowser(
				page.data.flash?.type === 'success'
					? 'Success'
					: page.data.flash?.type === 'error'
						? 'Error'
						: 'Message',
				$flash.message
			);
		}

		$flash = undefined;
	});

	const navLeft = [
		{ label: "What's On", href: '/events' },
		{ label: 'The Bar', href: '/#the-bar' }
	];

	const navRight = [
		{ label: 'Hire', href: '/hire' },
		{ label: 'Find Us', href: '/contact', cta: true }
	];

	const mobileNav = [
		{ label: "What's On", href: '/events' },
		{ label: 'The Bar', href: '/#the-bar' },
		{ label: 'Hire the Venue', href: '/hire' },
		{ label: 'Find Us', href: '/contact' }
	];

	const footerGroups = [
		{
			heading: 'Navigate',
			links: [
				{ label: "What's On", href: '/events' },
				{ label: 'The Bar', href: '/#the-bar' },
				{ label: 'Hire the Venue', href: '/hire' },
				{ label: 'Find Us', href: '/contact' }
			]
		},
		{
			heading: 'Visit',
			links: [
				{
					label: '5 Station Place',
					href: 'https://maps.google.com/?q=5+Station+Pl,+Finsbury+Park,+London+N4+2DH',
					external: true
				},
				{
					label: 'Finsbury Park, N4 2DH',
					href: 'https://maps.google.com/?q=5+Station+Pl,+Finsbury+Park,+London+N4+2DH',
					external: true
				},
				{ label: '020 3722 1060', href: 'tel:02037221060' }
			]
		},
		{
			heading: 'Legal',
			links: [
				{ label: 'Privacy Policy', href: '/privacy' },
				{ label: 'Cookie Policy', href: '/privacy#cookies' },
				{ label: 'Terms & Conditions', href: '/privacy#terms' }
			]
		}
	];

	let { children } = $props();

	function closeMobileNav() {
		navOpen = false;
	}

	onMount(() => {
		cookiePreference = localStorage.getItem('olex-cookies');
	});

	function saveCookiePreference(value) {
		localStorage.setItem('olex-cookies', value);
		cookiePreference = value;
	}
</script>

<svelte:head></svelte:head>
<ModeWatcher />
<Toaster position="bottom-right" richColors closeButton />
<ProgressBar color="#c9902a" zIndex={1000} />
{#if !page.url.pathname.includes('/dashboard') && page.url.pathname !== '/login'}
	<nav class="nav">
		<div class="nav-inner">
			<ul class="nav-links" id="nav-left">
				{#each navLeft as item}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
			</ul>

			<a href="/" class="nav-logo">Olex Inn</a>

			<ul class="nav-links" id="nav-right">
				{#each navRight as item}
					<li><a href={item.href} class:nav-cta={item.cta}>{item.label}</a></li>
				{/each}
			</ul>

			<button
				class="nav-burger"
				class:open={navOpen}
				aria-label="Open menu"
				aria-expanded={navOpen}
				onclick={() => (navOpen = !navOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</nav>

	<div class="nav-mobile" class:open={navOpen} id="nav-mobile">
		{#each mobileNav as item}
			<a href={item.href} onclick={closeMobileNav}>{item.label}</a>
		{/each}
	</div>

	{@render children()}

	<footer class="footer">
		<div class="container">
			<div class="footer-grid">
				<div>
					<div class="footer-brand">Olex Inn</div>
					<p class="footer-tagline">
						Bar & live music venue.<br />Finsbury Park, North London.<br />Open until 4AM.
					</p>
				</div>

				{#each footerGroups as group}
					<div>
						<span class="footer-heading">{group.heading}</span>
						<div class="footer-links">
							{#each group.links as link}
								<a
									href={link.href}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener' : undefined}>{link.label}</a
								>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<div class="footer-bottom">
				<p>© 2025 Olex Inn London. All rights reserved.</p>
				<p>No bookings. Just show up.</p>
			</div>
		</div>
	</footer>

	{#if cookiePreference === null}
		<!-- Waiting for onMount so SSR does not flash the banner before localStorage is checked. -->
	{:else if !cookiePreference}
		<div class="cookie-banner">
			<p>We use cookies to improve your experience. <a href="/privacy#cookies">Learn more</a>.</p>
			<div class="cookie-actions">
				<button
					class="btn-outline"
					style="padding:0.6rem 1.25rem;font-size:0.65rem;"
					onclick={() => saveCookiePreference('necessary')}>Necessary Only</button
				>
				<button
					class="btn-gold"
					style="padding:0.6rem 1.25rem;font-size:0.65rem;"
					onclick={() => saveCookiePreference('all')}>Accept All</button
				>
			</div>
		</div>
	{/if}
{:else}
	{@render children()}
{/if}

<style>
	.nav-burger.open span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.nav-burger.open span:nth-child(2) {
		opacity: 0;
	}

	.nav-burger.open span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}
</style>
