// 'use client'; // This component uses client-only features

// // Dependencies - React
// import React from 'react';

// // Dependencies - Main Components
// import { Dialog, DialogInterface } from '@structure/source/common/dialogs/Dialog';
// import { Button } from '@structure/source/common/buttons/Button';
// import { Alert } from '@structure/source/common/notifications/Alert';

// // Dependencies - SVGs
// import TrashIcon from '@structure/assets/icons/content/TrashIcon.svg';

// // Dependencies - API
// import { useMutation } from '@apollo/client';
// import { PortMonitorDeleteDocument } from '@project/source/api/graphql/GraphQlGeneratedCode';

// // Component - DeleteMonitorDialog
// export interface DeleteMonitorDialogInterface extends DialogInterface {
//     monitorId: string;
//     monitorHost: string;
//     onDeleteComplete?: () => void;
// }

// export function DeleteMonitorDialog(properties: DeleteMonitorDialogInterface) {
//     // State
//     const [open, setOpen] = React.useState(properties.open ?? false);
//     const [error, setError] = React.useState<string | null>(null);

//     // Hooks - GraphQL
//     const [deleteMonitor, { loading }] = useMutation(PortMonitorDeleteDocument);

//     // Effects
//     React.useEffect(() => {
//         setOpen(properties.open ?? false);
//     }, [properties.open]);

//     // Handlers
//     function handleDelete() {
//         setError(null);

//         deleteMonitor({
//             variables: {
//                 input: {
//                     monitorId: properties.monitorId,
//                 },
//             },
//             onCompleted: function (data) {
//                 if(data.portMonitorDelete.success) {
//                     onOpenChangeIntercept(false);
//                     if(properties.onDeleteComplete) {
//                         properties.onDeleteComplete();
//                     }
//                 }
//                 else {
//                     setError('Unable to delete monitor');
//                 }
//             },
//             onError: function (error) {
//                 setError(error.message);
//             },
//         });
//     }

//     function onOpenChangeIntercept(open: boolean) {
//         // Call the onOpenChange callback
//         if(properties.onOpenChange) {
//             properties.onOpenChange(open);
//         }

//         // Update the open state
//         setOpen(open);
//     }

//     // Render the component
//     return (
//         <Dialog
//             header="Delete Port Monitor"
//             content={
//                 <div className="p-6">
//                     {error && (
//                         <Alert variant="error" className="mb-4">
//                             {error}
//                         </Alert>
//                     )}

//                     <div className="mb-6">
//                         <p className="mb-4">
//                             Are you sure you want to delete the port monitor for{' '}
//                             <strong>{properties.monitorHost}</strong>?
//                         </p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                             This action cannot be undone. The monitor will stop running and all associated data will be
//                             deleted.
//                         </p>
//                     </div>
//                 </div>
//             }
//             footer={
//                 <div className="flex justify-end gap-3 p-4">
//                     <Button
//                         variant="default"
//                         onClick={function () {
//                             onOpenChangeIntercept(false);
//                         }}
//                         disabled={loading}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="destructive"
//                         onClick={handleDelete}
//                         loading={loading}
//                         disabled={loading}
//                         icon={TrashIcon}
//                     >
//                         Delete Monitor
//                     </Button>
//                 </div>
//             }
//             {...properties}
//             // Spread these properties after all properties to ensure they are not overwritten
//             open={open}
//             onOpenChange={onOpenChangeIntercept}
//         />
//     );
// }
