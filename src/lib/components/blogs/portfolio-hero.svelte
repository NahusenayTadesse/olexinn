<script lang="ts">
	import { BookOpenIcon } from '@lucide/svelte';
</script>

<section
	class="relative mb-10 overflow-hidden bg-muted/30 bg-cover bg-center px-4 py-20 text-white sm:py-32"
	style="background-image: url('/event (2).webp')"
>
	<!-- Overlay to ensure text readability -->
	<div class="absolute inset-0 bg-primary/70 dark:bg-primary-foreground/70"></div>

	<!-- Content -->
	<div class="relative mx-auto max-w-4xl px-4 text-center">
		<!-- Tag / Badge -->
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-secondary/20"
		>
			<BookOpenIcon class="size-4" />
			<span>Perspectives & Insights</span>
		</div>

		<!-- Main Title -->
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
			Stories, Trends, and
			<span class="text-white/80">Expertise</span>
		</h1>

		<!-- Subtext -->
		<p
			class="mx-auto max-w-2xl text-lg leading-relaxed text-secondary/90 sm:text-xl dark:text-primary/80"
		>
			Dive into our latest articles, industry deep-dives, and behind-the-scenes looks at how we
			bring vision to life.
		</p>
	</div>
</section>
