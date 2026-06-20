<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';
	import {
		CalendarHeartIcon,
		MapPin,
		TrendingUpIcon,
		QuoteIcon,
		CoffeeIcon,
		ZapIcon
	} from '@lucide/svelte';

	const features = [
		{
			id: 'event-management',
			title: 'What types of events do you manage?',
			description:
				'We provide full-service management for corporate events, brand activations, and private functions, focusing on creating cinematic and high-energy experiences.',
			icon: CalendarHeartIcon
		},
		{
			id: 'venue-booking',
			title: 'How can I book 4 Kilo Plaza?',
			description:
				'You can request a booking for our central Addis Ababa venue directly through our "Request a Quote" system for corporate meetings, lifestyle events, or private gatherings.',
			icon: MapPin
		},
		{
			id: 'sponsorship-sales',
			title: 'Do you offer brand partnership opportunities?',
			description:
				'Yes, we act as a sales and sponsorship platform, connecting brands with audiences through event-based marketing and sponsorship acquisition.',
			icon: TrendingUpIcon
		},
		{
			id: 'quote-process',
			title: 'How do I get a price estimate for my event?',
			description:
				'Submit a request via our Quote Form with your event date, location, budget range, and estimated number of guests to receive a tailored proposal.',
			icon: QuoteIcon
		},
		{
			id: 'catering-services',
			title: 'Do you provide catering and add-ons?',
			description:
				'Beyond management and venue rental, we offer integrated catering solutions including coffee and food services to complement your event.',
			icon: CoffeeIcon
		},
		{
			id: 'differentiation',
			title: 'What makes Yebehir Ventures different?',
			description:
				'We are a multi-service hybrid that combines event management with venue operations and revenue-driven sales tools to monetize every experience.',
			icon: ZapIcon
		}
	];
</script>

<div
	class="min-h-dvh bg-linear-to-br from-primary/5 via-background to-accent/5 px-4 py-12 sm:px-6 lg:px-8"
>
	<div class="mx-auto w-full">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold text-foreground sm:text-5xl">FAQ</h1>
			<p class="text-lg text-muted-foreground">
				Frequently asked questions about our products and services.
			</p>
		</div>

		<!-- Accordion -->
		<Accordion
			type="single"
			collapsible
			class="grid w-9/10 grid-cols-1 items-center gap-3 space-y-3 justify-self-center lg:grid-cols-1"
		>
			{#each features as feature (feature.id)}
				<AccordionItem
					value={feature.id}
					class="hover:shadow-lg-md transition-shadow-lg overflow-hidden rounded-lg border border-border shadow-lg duration-200"
				>
					<AccordionTrigger
						class="px-6 py-4 transition-colors duration-200 hover:bg-accent/5 data-[state=open]:bg-primary/5"
					>
						<div class="flex items-center gap-4 text-left">
							<div class="shrink-0 rounded-lg bg-primary p-2">
								<feature.icon class="size-5 text-accent" />
							</div>
							<h3 class="text-lg font-semibold text-foreground">{feature.title}</h3>
						</div>
					</AccordionTrigger>
					<AccordionContent class="border-t border-border bg-card/50 px-6 py-4">
						<p class="leading-relaxed text-muted-foreground">{feature.description}</p>
					</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
</div>
