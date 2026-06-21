import { renderComponent } from '$lib/components/ui/data-table/index.js';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import ImageViewer from '$lib/components/Table/image-viewer.svelte';
import BigText from '$lib/components/Table/bigText.svelte';
import Statuses from '$lib/components/Table/statuses.svelte';

export const columns = [
	{
		accessorKey: 'index',
		header: '#',
		cell: (info) => info.row.index + 1,
		sortable: false
	},

	{
		accessorKey: 'imgUrl',
		header: 'Featured Image',
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(ImageViewer, {
				src: row.original.imgUrl,
				alt: row.original.title
			});
		}
	},

	{
		accessorKey: 'name',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Name',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(DataTableLinks, {
				id: row.original.id,
				name: row.original.name,
				link: '/dashboard/venues/single'
			});
		}
	},

	{
		accessorKey: 'capacity',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Capacity',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return row.original.capacity + ' people';
		}
	},
	{
		accessorKey: 'hours',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Hours',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
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
		accessorKey: 'live',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Live',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Statuses, {
				status: row.original.live ? 'Yes' : 'No'
			});
		}
	},

	{
		accessorKey: 'Address',
		header: 'Address',
		cell: ({ row }) => {
			return renderComponent(BigText, {
				text: row.original.address || ''
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
