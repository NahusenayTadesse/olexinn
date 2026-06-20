import { renderComponent } from '$lib/components/ui/data-table/index.js';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import ImageViewer from '$lib/components/Table/image-viewer.svelte';
import { formatEthiopianDate } from '$lib/global.svelte';
import BigText from '$lib/components/Table/bigText.svelte';
import Statuses from '$lib/components/Table/statuses.svelte';
import GenreList from './genreList.svelte';

export const columns = [
	{
		accessorKey: 'index',
		header: '#',
		cell: (info) => info.row.index + 1,
		sortable: false
	},

	{
		accessorKey: 'imageUrl',
		header: 'Featured Image',
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(ImageViewer, {
				src: row.original.imageUrl,
				alt: row.original.title
			});
		}
	},

	{
		accessorKey: 'title',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Title',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(DataTableLinks, {
				id: row.original.id,
				name: row.original.title,
				link: '/dashboard/events/single'
			});
		}
	},

	{
		accessorKey: 'genres',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Genres',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(GenreList, {
				names: row.original.genres
			});
		}
	},
	{
		accessorKey: 'eventDate',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Event Date',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// Keeping your custom Ethiopian date formatter
			return formatEthiopianDate(row.original.eventDate);
		}
	},

	{
		accessorKey: 'format',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Format',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},

	{
		accessorKey: 'entryType',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Entry Type',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Statuses, {
				status: row.original.entryType // Returns 'free' or 'ticketed'
			});
		}
	},

	{
		accessorKey: 'pricePence',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Price',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			if (!row.original.pricePence) return 'Free';
			// Basic formatting from pence to decimal currency format
			const formattedPrice = (row.original.pricePence / 100).toFixed(2);
			return `${row.original.currency || 'GBP'} ${formattedPrice}`;
		}
	},

	{
		accessorKey: 'isLive',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Live',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Statuses, {
				status: row.original.isLive ? 'Yes' : 'No'
			});
		}
	},

	{
		accessorKey: 'isPublished',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Published',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Statuses, {
				status: row.original.isPublished ? 'Yes' : 'No'
			});
		}
	},

	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => {
			return renderComponent(BigText, {
				text: row.original.description || ''
			});
		}
	}
];
