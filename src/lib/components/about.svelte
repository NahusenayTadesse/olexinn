<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { CalendarHeartIcon, MapPinIcon, TrendingUpIcon, ZapIcon } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	// Highlights based on "Key Differentiation" and "General Information"
	const highlights = [
		{
			icon: CalendarHeartIcon,
			label: 'Full-Service Events',
			description: 'Management for corporate, brand, and private events'
		},
		{
			icon: MapPinIcon,
			label: '4 Kilo Plaza',
			description: 'Central, flexible venue for Addis Ababa events'
		},
		{
			icon: TrendingUpIcon,
			label: 'Sales-Driven',
			description: 'Sponsorships and event-based marketing'
		},
		{
			icon: ZapIcon,
			label: 'Ahead of the Curve',
			description: 'Creating experiences and generating revenue'
		}
	];
</script>

<section class="relative px-4 pt-20 pb-8 sm:px-6 lg:px-8">
	<div class="mx-auto">
		<div
			transition:fly={{ y: 20, duration: 600 }}
			class="mb-16 flex flex-col items-center justify-center gap-4 justify-self-center text-center"
		>
			<h2 class="text-4xl font-bold sm:text-5xl">About Yebehir Ventures</h2>
			<p class="mx-auto max-w-3xl text-lg">
				Yebehir is a creative event and activation company based in Addis Ababa, Ethiopia. We
				specialize in event organizing and management, brand activations, sales outsourcing, and
				venue rental services at 4 Kilo Plaza. Our mission is to help brands create impactful
				experiences that connect with people and drive growth
			</p>
		</div>

		<div class="mb-16 grid gap-8 lg:grid-cols-3">
			<div transition:fly={{ y: 20, duration: 600, delay: 100 }} class="lg:col-span-2">
				<Card
					style="background-image: url('/event (2).webp')"
					class="relative z-0 flex h-full flex-col items-center justify-center overflow-hidden border-none bg-cover bg-center px-8 text-white shadow-xl"
				>
					<div class="absolute inset-0 -z-1 bg-primary/80 dark:bg-primary-foreground/80"></div>
					<CardHeader class="flex w-full flex-col items-center justify-center">
						<CardTitle class="text-center text-5xl text-[#F2E1D1]">Ahead of the Curve</CardTitle>
						<CardDescription class="text-2xl text-white/80"
							>More than just an event company</CardDescription
						>
					</CardHeader>
					<CardContent class="flex flex-col gap-4  text-white">
						<p class="leading-relaxed">
							Yebehir Ventures is a unique platform that integrates event management, venue
							providing, and sales/sponsorship services. We don't just organize events—we create
							experiences, generate revenue opportunities, and connect brands with audiences.
						</p>
						<p class="leading-relaxed">
							Our approach is bold, modern, and premium. Whether operating our central venue at 4
							Kilo Plaza or managing brand activations, our mission is to provide high-energy,
							lifestyle-focused experiences that build credibility.
						</p>
					</CardContent>
				</Card>
			</div>

			<div transition:fly={{ y: 20, duration: 600, delay: 200 }} class="flex flex-col gap-4">
				{#each highlights as highlight (highlight.label)}
					<Card class="border-accent transition-all duration-300 hover:shadow-md">
						<CardContent class="flex gap-2 p-4">
							<div class="shrink-0">
								<div class="flex size-10 items-center justify-center rounded-lg bg-accent/30">
									<highlight.icon class="size-6" />
								</div>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-sm font-semibold">{highlight.label}</p>
								<p class="mt-1 text-xs">{highlight.description}</p>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</section>
