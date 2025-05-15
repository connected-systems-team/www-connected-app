// 'use client'; // This component uses client-only features

// // Dependencies - React
// import React from 'react';

// // Dependencies - Main Components
// import { Button } from '@structure/source/common/buttons/Button';
// import { TimeAgo } from '@structure/source/common/time/TimeAgo';
// import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// // Dependencies - Local Components
// import { Badge } from './Badge';

// // Dependencies - SVGs
// import ArrowRightIcon from '@structure/assets/icons/interface/ArrowRightIcon.svg';
// import TrashIcon from '@structure/assets/icons/content/TrashIcon.svg';
// import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
// import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';

// // Dependencies - Utilities
// import { mergeClassNames } from '@structure/source/utilities/Style';
// import { PortMonitorQuery } from '@project/source/api/graphql/GraphQlGeneratedCode';

// // Component - MonitorListItem
// export interface MonitorListItemInterface {
//     className?: string;
//     monitor: NonNullable<PortMonitorQuery['portMonitor']>['items'][0];
//     onDelete: () => void;
// }

// export function MonitorListItem(properties: MonitorListItemInterface) {
//     // Render the component
//     const monitor = properties.monitor;

//     // Define types for monitor data
//     interface PortStateCheck {
//         port: string;
//         state: string;
//     }

//     interface MonitorInputData {
//         host: string;
//         ports: PortStateCheck[];
//         emailDeliveryPreference: string[];
//         region?: string;
//     }

//     // Parse the input JSON to get monitor data
//     const monitorInput: MonitorInputData = monitor.input
//         ? typeof monitor.input === 'string'
//             ? JSON.parse(monitor.input)
//             : monitor.input
//         : { host: 'Unknown', ports: [], emailDeliveryPreference: [] };

//     // Extract host, ports, and emailDeliveryPreference from input
//     const host = monitorInput.host || 'Unknown';
//     const ports = monitorInput.ports || [];
//     const emailDeliveryPreference = monitorInput.emailDeliveryPreference || [];

//     // Format time for display (HH:MM UTC)
//     const formattedTime = `${String(monitor.hour).padStart(2, '0')}:${String(monitor.minute).padStart(2, '0')} UTC`;

//     // Get status badge
//     function getStatusBadge() {
//         switch(monitor.state) {
//             case 'Active':
//                 return (
//                     <Badge icon={CheckCircledGreenBorderIcon} color="green">
//                         Active
//                     </Badge>
//                 );
//             case 'Inactive':
//                 return (
//                     <Badge icon={ErrorCircledRedBorderIcon} color="red">
//                         Inactive
//                     </Badge>
//                 );
//             default:
//                 return <Badge color="gray">Unknown</Badge>;
//         }
//     }

//     return (
//         <div className={mergeClassNames('overflow-hidden rounded-lg border shadow-sm', properties.className)}>
//             <div className="p-4 sm:p-6">
//                 <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
//                     <div>
//                         <div className="mb-1 flex items-center gap-2">
//                             <h3 className="text-lg font-semibold">{host}</h3>
//                             <CopyButton value={host} size="sm" />
//                         </div>
//                         <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//                             <span>
//                                 Created <TimeAgo startTimeInMilliseconds={new Date(monitor.createdAt).getTime()} />
//                             </span>
//                             {monitor.updatedAt !== monitor.createdAt && (
//                                 <span>
//                                     • Updated{' '}
//                                     <TimeAgo startTimeInMilliseconds={new Date(monitor.updatedAt).getTime()} />
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-2">{getStatusBadge()}</div>
//                 </div>

//                 <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
//                     <div>
//                         <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Ports</h4>
//                         <div className="space-y-1">
//                             {ports.map((port, index) => (
//                                 <div key={index} className="flex items-center gap-1">
//                                     <span className="text-sm font-medium">{port.port}</span>
//                                     <ArrowRightIcon className="h-3 w-3 text-gray-400" />
//                                     <span className="text-sm">{port.state}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div>
//                         <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Schedule</h4>
//                         <p className="text-sm">{formattedTime}</p>
//                     </div>

//                     <div>
//                         <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
//                             Email Notifications
//                         </h4>
//                         <div className="space-y-1">
//                             {emailDeliveryPreference.map((pref, index) => (
//                                 <span key={index} className="text-sm">
//                                     {pref === 'Success' && 'Success'}
//                                     {pref === 'Failure' && 'Failure'}
//                                     {pref === 'Mismatch' && 'Mismatch'}
//                                     {index < emailDeliveryPreference.length - 1 && ', '}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-4 flex justify-end">
//                     <Button onClick={properties.onDelete} variant="destructive" size="sm" icon={TrashIcon}>
//                         Delete
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
