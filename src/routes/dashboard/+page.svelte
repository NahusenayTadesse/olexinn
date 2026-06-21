<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import {
		ShieldCheck,
		Users,
		CreditCard,
		Newspaper,
		Calendar,
		Image,
		MessageSquare,
		ShoppingBag,
		Quote,
		Briefcase,
		MapPin,
		Plus
	} from '@lucide/svelte';

	const navigation = [
		{
			title: 'Operations',
			description: 'Events, Venues, Images and Brochure',
			color: 'border-l-emerald-500',
			span: 'md:col-span-2',
			links: [
				{ name: 'Events', href: '/events', icon: Calendar },
				{ name: 'Venues', href: '/venues', icon: MapPin },
				{ name: 'Images', href: '/images', icon: Image },
				{ name: 'Brochures', href: '/brochures', icon: MessageSquare }
			]
		},
		{
			title: 'Sales & CRM',
			description: 'Messages and Bookings',
			color: 'border-l-rose-500',
			links: [
				{ name: 'Bookings', href: '/bookings', icon: Calendar },
				{ name: 'Messages', href: '/messages', icon: MessageSquare }
			]
		},

		{
			title: 'User Management',
			description: 'Manage system access and permissions',
			color: 'border-l-blue-500',
			links: [{ name: 'Users', href: '/admin-panel/users', icon: Users }]
		}
	];
</script>

<svelte:head>
	<title>Dashboard - Olex Inn</title>
	<meta name="description" content="Dashboard for Olex Inn" />
</svelte:head>

<div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-1 lg:grid-cols-1">
	{#each navigation as section (section.title)}
		<Card.Root
			class="group overflow-hidden border-l-4 {section.color} transition-all hover:shadow-lg {section.span ??
				''}"
		>
			<Card.Header>
				<Card.Title class="text-xl">{section.title}</Card.Title>
				<Card.Description>{section.description}</Card.Description>
			</Card.Header>
			<Card.Content class="grid grid-cols-1 gap-3 sm:grid-cols-3">
				{#each section.links as link (link.name)}
					<a
						href="/dashboard{link.href}"
						class="flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-primary hover:text-primary-foreground"
					>
						<link.icon class="h-6 w-6" />
						<span class="text-xs font-medium">{link.name}</span>
					</a>
				{/each}
			</Card.Content>
		</Card.Root>
	{/each}
</div>
