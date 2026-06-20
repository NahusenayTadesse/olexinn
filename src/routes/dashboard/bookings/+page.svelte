<script>
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';

	import Read from './read.svelte';
	import Delete from './delete.svelte';
	import BigText from './bigText.svelte';

	const columns = [
		{
			id: 'index',
			header: '#',
			cell: (info) => {
				const rowIndex = info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id);
				return rowIndex + 1;
			},
			enableSorting: false
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
				return row.original.firstName + ' ' + row.original.lastName;
			}
		},

		{
			accessorKey: 'phone',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Phone',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Copy, { data: row.original.phone })
		},
		{
			accessorKey: 'email',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Email',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Copy, { data: row.original.email })
		},
		{
			accessorKey: 'eventType',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Event Type',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true
		},

		{
			accessorKey: 'guestCount',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Guest Count',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				return row.original.guestCount + ' guests';
			}
		},

		{
			accessorKey: 'status',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Status',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
		},

		{
			accessorKey: 'message',
			header: 'Message',
			sortable: true,
			cell: ({ row }) => renderComponent(BigText, { text: row.original.message })
		},

		{
			accessorKey: 'createdAt',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Submitted At',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return formatDate(row.original.submittedAt);
			}
		},
		{
			accessorKey: 'changeStatus',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Change Status',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Read, {
					id: row.original.id,
					status: row.original.status,
					data: data.readForm
				});
			}
		},
		{
			accessorKey: '',
			header: 'Delete',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Delete, {
					id: row.original.id,
					action: '?/delete',
					data: data.deleteForm
				});
			}
		}
	];
	let { data } = $props();

	import Copy from '$lib/Copy.svelte';
	import { formatEthiopianDate as formatDate } from '$lib/global.svelte.js';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';

	let filteredList = $derived(data?.allPaymentMethods);
</script>

<svelte:head>
	<title>Messages</title>
</svelte:head>
{#key data?.allPaymentMethods}
	<FilterMenu data={data?.allPaymentMethods} bind:filteredList filterKeys={['subject', 'isRead']} />
	<DataTable {columns} data={filteredList} search={true} fileName="Messages" />
{/key}
