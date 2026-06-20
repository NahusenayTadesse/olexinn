<script lang="ts">
	import {
		Users,
		UserRoundCog,
		LayoutDashboard,
		MapPin,
		TrendingUp,
		Plus,
		Sheet,
		Mail,
		Star,
		Contact,
		Quote,
		Briefcase,
		Book,
		Images
	} from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';

	import NavMain from './NavMain.svelte';

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const navigation = [
		{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },

		{
			title: 'Event',
			url: '/dashboard/events',
			icon: Briefcase
		},

		{
			title: 'Bookings',
			url: '/dashboard/bookings',
			icon: Book
		},

		{
			title: 'Messages',
			url: '/dashboard/messages',
			icon: Mail
		},
		{
			title: 'Admin Panel',
			url: '/dashboard/admin-panel',
			icon: UserRoundCog,
			items: [{ title: 'Users', url: '/dashboard/admin-panel/users', icon: Users }]
		}
	];

	const sidebar = useSidebar();

	function closeSidebar() {
		if (sidebar.isMobile) {
			sidebar.setOpenMobile(false);
		}
	}
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Content class="z-9999! h-full overflow-y-scroll pt-4 [scrollbar-width:thin]">
		<Sidebar.Group>
			<Sidebar.GroupLabel>
				<a
					class="flex flex-row items-center justify-center gap-4"
					href="/"
					title="Go to Website Home Page"
					target="_blank"
				>
					<img
						src="/logoForWhite.webp"
						class="block h-16 w-16 object-contain dark:hidden"
						alt="Logo"
					/>
					<img src="/logo.webp" class="hidden h-16 w-16 object-contain dark:block" alt="Logo" />
					<h4 class="text-center text-[16px]! font-bold">Olexinn</h4>
				</a>
			</Sidebar.GroupLabel>

			<Sidebar.GroupContent class="my-6">
				<NavMain {closeSidebar} items={navigation} />
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer class="flex flex-row border-t bg-background">
		<Sidebar.GroupLabel>
			Powered By <a
				href="https://nahusenaytadesse.vercel.app"
				target="_blank"
				class="ml-1 hover:underline">NT</a
			>
		</Sidebar.GroupLabel>
	</Sidebar.Footer>
</Sidebar.Root>
