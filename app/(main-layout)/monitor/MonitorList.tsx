// 'use client'; // This component uses client-only features

// // Dependencies - React
// import React from 'react';

// // Dependencies - Main Components
// import { LoadingAnimation } from '@structure/source/common/animations/LoadingAnimation';
// import { Alert } from '@structure/source/common/notifications/Alert';
// import { Pagination } from '@structure/source/common/navigation/pagination/Pagination';

// // Dependencies - Local Components
// import { MonitorListItem } from './MonitorListItem';
// import { DeleteMonitorDialog } from './dialogs/DeleteMonitorDialog';

// // Dependencies - API
// import { useQuery } from '@apollo/client';
// import {
//     ColumnFilterConditionOperator,
//     OrderByDirection,
//     PortMonitorDocument,
// } from '@project/source/api/graphql/GraphQlGeneratedCode';

// // Dependencies - SVGs
// // import SearchIcon from '@structure/assets/icons/navigation/SearchIcon.svg';

// // Dependencies - Utilities
// import { mergeClassNames } from '@structure/source/utilities/Style';
// import { useNotice } from '@structure/source/common/notifications/NoticeProvider';

// // Component - MonitorList
// export interface MonitorListInterface {
//     className?: string;
// }

// export function MonitorList(properties: MonitorListInterface) {
//     // State
//     const [pageIndex, setPageIndex] = React.useState(0);
//     const [pageSize] = React.useState(10);
//     const [deleteMonitorId, setDeleteMonitorId] = React.useState<string | null>(null);
//     const [search, setSearch] = React.useState('');
//     // const [searchInput, setSearchInput] = React.useState('');
//     const notice = useNotice();

//     // Hooks - GraphQL
//     const { data, loading, error, refetch } = useQuery(PortMonitorDocument, {
//         variables: {
//             pagination: {
//                 itemIndex: pageIndex,
//                 itemsPerPage: pageSize,
//                 filters: search
//                     ? [
//                           {
//                               column: 'host',
//                               operator: ColumnFilterConditionOperator.Like,
//                               value: search,
//                           },
//                       ]
//                     : [],
//                 orderBy: [
//                     {
//                         key: 'updatedAt',
//                         direction: OrderByDirection.Descending,
//                     },
//                 ],
//             },
//         },
//         fetchPolicy: 'network-only',
//     });

//     // Effects
//     React.useEffect(() => {
//         refetch();
//     }, [pageIndex, search, refetch]);

//     // Handlers
//     function handlePageChange(newPage: number) {
//         setPageIndex((newPage - 1) * pageSize);
//     }

//     // function handleSearch(event: React.FormEvent) {
//     //     event.preventDefault();
//     //     setSearch(searchInput);
//     //     setPageIndex(0); // Reset to first page on new search
//     // }

//     function handleDelete(monitorId: string) {
//         setDeleteMonitorId(monitorId);
//     }

//     function handleDeleteComplete() {
//         refetch();
//         notice.addNotice({
//             title: 'Success',
//             content: 'Monitor deleted successfully',
//         });
//     }

//     // Helper function to safely extract host from monitor input
//     function getMonitorHost(monitor: any): string {
//         if(!monitor || !monitor.input) return 'Unknown';

//         try {
//             if(typeof monitor.input === 'string') {
//                 const parsed = JSON.parse(monitor.input);
//                 return parsed.host || 'Unknown';
//             }
//             else {
//                 return monitor.input.host || 'Unknown';
//             }
//         }
//         catch(error) {
//             console.error('Error parsing monitor input:', error);
//             return 'Unknown';
//         }
//     }

//     // Find monitor by ID
//     const monitorToDelete = data?.portMonitor.items.find(function (monitor) {
//         return monitor.id === deleteMonitorId;
//     });

//     // Render the component
//     return (
//         <div className={mergeClassNames('', properties.className)}>
//             {/* Search Bar */}
//             {/* <form onSubmit={handleSearch} className="mb-4">
//                 <div className="relative">
//                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
//                     </div>
//                     <input
//                         type="search"
//                         className="focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
//                         placeholder="Search by hostname..."
//                         value={searchInput}
//                         onChange={function (event) {
//                             setSearchInput(event.target.value);
//                         }}
//                     />
//                 </div>
//             </form> */}

//             {/* Error State */}
//             {error && (
//                 <Alert variant="error" className="mb-4">
//                     {error.message}
//                 </Alert>
//             )}

//             {/* Loading State */}
//             {loading && (
//                 <div className="flex items-center justify-center py-12">
//                     <LoadingAnimation />
//                 </div>
//             )}

//             {/* Empty State */}
//             {!loading && data?.portMonitor.items.length === 0 && (
//                 <div className="rounded-lg border bg-gray-50 py-12 text-center">
//                     <h3 className="mb-2 text-lg font-medium">No monitors found</h3>
//                     <p className="mb-4 text-gray-500 dark:text-gray-400">
//                         {search
//                             ? 'No monitors match your search criteria'
//                             : 'Create your first port monitor to get started'}
//                     </p>
//                     {search && (
//                         <button
//                             onClick={function () {
//                                 setSearch('');
//                                 // setSearchInput('');
//                             }}
//                             className="text-blue-600 dark:text-blue-400 font-medium"
//                         >
//                             Clear search
//                         </button>
//                     )}
//                 </div>
//             )}

//             {/* List View */}
//             {!loading && data && data?.portMonitor.items.length > 0 && (
//                 <>
//                     <div className="space-y-4">
//                         {data.portMonitor.items.map(function (monitor) {
//                             return (
//                                 <MonitorListItem
//                                     key={monitor.id}
//                                     monitor={monitor}
//                                     onDelete={function () {
//                                         handleDelete(monitor.id);
//                                     }}
//                                 />
//                             );
//                         })}
//                     </div>

//                     {/* Pagination */}
//                     {data.portMonitor.pagination.pagesTotal > 1 && (
//                         <div className="mt-4">
//                             <Pagination
//                                 page={data.portMonitor.pagination.page}
//                                 pagesTotal={data.portMonitor.pagination.pagesTotal}
//                                 onChange={handlePageChange}
//                             />
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* Delete Dialog */}
//             {deleteMonitorId && monitorToDelete && (
//                 <DeleteMonitorDialog
//                     open={!!deleteMonitorId}
//                     onOpenChange={function (open) {
//                         if(!open) setDeleteMonitorId(null);
//                     }}
//                     monitorId={deleteMonitorId}
//                     monitorHost={getMonitorHost(monitorToDelete)}
//                     onDeleteComplete={handleDeleteComplete}
//                 />
//             )}
//         </div>
//     );
// }
