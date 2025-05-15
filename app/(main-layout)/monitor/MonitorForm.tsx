// 'use client'; // This component uses client-only features

// // Dependencies - React
// import React from 'react';

// // Dependencies - Main Components
// import { Button } from '@structure/source/common/buttons/Button';
// import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
// import { FormInputText } from '@structure/source/common/forms/FormInputText';
// import { FormInputSelect } from '@structure/source/common/forms/FormInputSelect';
// import { Tip } from '@structure/source/common/popovers/Tip';
// import { FormInputCheckbox } from '@structure/source/common/forms/FormInputCheckbox';
// import { InputCheckboxState } from '@structure/source/common/forms/InputCheckbox';
// import { Alert } from '@structure/source/common/notifications/Alert';

// // Dependencies - API
// import { useMutation, useQuery } from '@apollo/client';
// import { GridRegionsDocument, PortMonitorCreateDocument } from '@project/source/api/graphql/GraphQlGeneratedCode';
// import { PortStateValue, PortCheckFlowNodeResultStatus } from '@project/source/api/graphql/GraphQlGeneratedCode';

// // Dependencies - SVGs
// import InfoCircledFilledIcon from '@structure/assets/icons/status/InformationCircledFilledIcon.svg';

// // Dependencies - Utilities
// import { mergeClassNames } from '@structure/source/utilities/Style';
// import { isPrivateIpAddress } from '@structure/source/utilities/network/IpAddress';
// import { useNotice } from '@structure/source/common/notifications/NoticeProvider';

// // Component - MonitorForm
// export interface MonitorFormInterface {
//     className?: string;
// }

// export function MonitorForm(properties: MonitorFormInterface) {
//     // References
//     const hostInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const portInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const portStateInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const regionInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const hourInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const minuteInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const notifyOnSuccessInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const notifyOnFailureInputReference = React.useRef<FormInputReferenceInterface>(null);
//     const notifyOnMismatchInputReference = React.useRef<FormInputReferenceInterface>(null);

//     // Hooks - GraphQL
//     const [createMonitor, { loading: createLoading }] = useMutation(PortMonitorCreateDocument);
//     const { data: regionsData, loading: regionsLoading } = useQuery(GridRegionsDocument);
//     const notice = useNotice();

//     // State
//     const [error, setError] = React.useState<string | null>(null);

//     // Functions
//     function handleSubmit() {
//         // Get values from form inputs
//         const host = hostInputReference.current?.getValue() as string;
//         const port = portInputReference.current?.getValue() as string;
//         const portState = portStateInputReference.current?.getValue() as string;
//         const region = regionInputReference.current?.getValue() as string;
//         const hour = hourInputReference.current?.getValue() as string;
//         const minute = minuteInputReference.current?.getValue() as string;
//         const notifyOnSuccess = notifyOnSuccessInputReference.current?.getValue() as boolean;
//         const notifyOnFailure = notifyOnFailureInputReference.current?.getValue() as boolean;
//         const notifyOnMismatch = notifyOnMismatchInputReference.current?.getValue() as boolean;

//         // Validate inputs
//         if(isPrivateIpAddress(host)) {
//             setError('Private IP addresses are not supported');
//             return;
//         }

//         // Validate required fields
//         if(!host || !port || !portState || !region) {
//             setError('Please fill in all required fields');
//             return;
//         }

//         // Clear any previous errors
//         setError(null);

//         // Prepare email delivery preferences array
//         const emailDeliveryPreference: PortCheckFlowNodeResultStatus[] = [];
//         if(notifyOnSuccess) emailDeliveryPreference.push(PortCheckFlowNodeResultStatus.Success);
//         if(notifyOnFailure) emailDeliveryPreference.push(PortCheckFlowNodeResultStatus.Failure);
//         if(notifyOnMismatch) emailDeliveryPreference.push(PortCheckFlowNodeResultStatus.Mismatch);

//         if(emailDeliveryPreference.length === 0) {
//             setError('Select at least one notification option');
//             return;
//         }

//         // Create the monitor
//         createMonitor({
//             variables: {
//                 input: {
//                     host,
//                     ports: [
//                         {
//                             port,
//                             state: portState as PortStateValue,
//                         },
//                     ],
//                     region,
//                     hour: parseInt(hour, 10),
//                     minute: parseInt(minute, 10),
//                     emailDeliveryPreference,
//                 },
//             },
//             onCompleted: function () {
//                 notice.addNotice({
//                     title: 'Success',
//                     content: 'Monitor created successfully',
//                 });

//                 // Reset form
//                 hostInputReference.current?.setValue('');
//                 portInputReference.current?.setValue('');
//                 portStateInputReference.current?.setValue('Open');
//                 hourInputReference.current?.setValue('0');
//                 minuteInputReference.current?.setValue('0');
//                 notifyOnSuccessInputReference.current?.setValue(true);
//                 notifyOnFailureInputReference.current?.setValue(true);
//                 notifyOnMismatchInputReference.current?.setValue(true);
//             },
//             onError: function (error) {
//                 setError(error.message);
//             },
//         });
//     }

//     // Prepare port state options
//     const portStateOptions = [
//         { value: 'Open', label: 'Open' },
//         { value: 'Closed', label: 'Closed' },
//         { value: 'Filtered', label: 'Filtered' },
//         { value: 'Unfiltered', label: 'Unfiltered' },
//         { value: 'OpenFiltered', label: 'Open Filtered' },
//         { value: 'ClosedFiltered', label: 'Closed Filtered' },
//     ];

//     // Prepare time options
//     const hours = Array.from({ length: 24 }, function (_, i) {
//         return {
//             value: i.toString(),
//             label: i.toString().padStart(2, '0'),
//         };
//     });

//     const minutes = Array.from({ length: 60 }, function (_, i) {
//         return {
//             value: i.toString(),
//             label: i.toString().padStart(2, '0'),
//         };
//     });

//     // Render the component
//     return (
//         <div className={mergeClassNames('', properties.className)}>
//             {error && (
//                 <Alert className="mb-4" variant="error">
//                     {error}
//                 </Alert>
//             )}

//             <div className="mb-4">
//                 <FormInputText
//                     ref={hostInputReference}
//                     id="host"
//                     label={
//                         <div className="flex items-center gap-1">
//                             Host
//                             <Tip content="Enter a domain name or IP address to monitor (e.g., example.com or 203.0.113.1)">
//                                 <InfoCircledFilledIcon className="h-4 w-4" />
//                             </Tip>
//                         </div>
//                     }
//                     placeholder="example.com or 203.0.113.1"
//                 />
//             </div>

//             <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <FormInputText
//                     ref={portInputReference}
//                     id="port"
//                     label="Port"
//                     labelTip="The port number to monitor (e.g., 80, 443, 22)"
//                     placeholder="80"
//                 />

//                 <FormInputSelect
//                     ref={portStateInputReference}
//                     id="portState"
//                     label={'Expected State'}
//                     items={portStateOptions}
//                     defaultValue="Open"
//                 />
//             </div>

//             <div className="mb-4">
//                 <FormInputSelect
//                     ref={regionInputReference}
//                     id="region"
//                     label={
//                         <div className="flex items-center gap-1">
//                             Region
//                             <Tip content="The geographic region from which to run the port check">
//                                 <InfoCircledFilledIcon className="h-4 w-4" />
//                             </Tip>
//                         </div>
//                     }
//                     items={
//                         regionsData?.gridRegions?.map(function (region) {
//                             return {
//                                 value: region.id,
//                                 label: region.displayName,
//                             };
//                         }) || []
//                     }
//                     loadingItems={regionsLoading}
//                     defaultValue={regionsData?.gridRegions?.[0]?.id}
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="mb-1 flex items-center gap-1 text-sm font-medium">
//                     Schedule
//                     <Tip content="The time of day (UTC) when the port check will run">
//                         <InfoCircledFilledIcon className="h-4 w-4" />
//                     </Tip>
//                 </label>

//                 <div className="flex items-center gap-2">
//                     <div className="flex-1">
//                         <FormInputSelect
//                             ref={hourInputReference}
//                             id="hour"
//                             label="Hour (UTC)"
//                             items={hours}
//                             defaultValue="0"
//                         />
//                     </div>
//                     <span className="text-xl">:</span>
//                     <div className="flex-1">
//                         <FormInputSelect
//                             ref={minuteInputReference}
//                             id="minute"
//                             label="Minute"
//                             items={minutes}
//                             defaultValue="0"
//                         />
//                     </div>
//                     <span className="ml-2 whitespace-nowrap text-sm">UTC</span>
//                 </div>
//             </div>

//             <div className="mb-6">
//                 <label className="mb-2 flex items-center gap-1 text-sm font-medium">
//                     Email Notifications
//                     <Tip content="Choose when you want to receive email notifications">
//                         <InfoCircledFilledIcon className="h-4 w-4" />
//                     </Tip>
//                 </label>

//                 <div className="space-y-2">
//                     <FormInputCheckbox
//                         ref={notifyOnSuccessInputReference}
//                         id="notifyOnSuccess"
//                         label="Success - Port state matches expectations"
//                         defaultValue={InputCheckboxState.Checked}
//                     />
//                     <FormInputCheckbox
//                         ref={notifyOnFailureInputReference}
//                         id="notifyOnFailure"
//                         label="Failure - Could not check port (timeout, error)"
//                         defaultValue={InputCheckboxState.Checked}
//                     />
//                     <FormInputCheckbox
//                         ref={notifyOnMismatchInputReference}
//                         id="notifyOnMismatch"
//                         label="Mismatch - Port state does not match expectations"
//                         defaultValue={InputCheckboxState.Checked}
//                     />
//                 </div>
//             </div>

//             <Button onClick={handleSubmit} disabled={createLoading} loading={createLoading} className="w-full">
//                 Create Monitor
//             </Button>
//         </div>
//     );
// }
