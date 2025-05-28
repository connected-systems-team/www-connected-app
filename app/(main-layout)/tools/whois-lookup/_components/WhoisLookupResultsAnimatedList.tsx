// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import {
    WhoisLookupResultItemProperties,
    WhoisDataInterface,
    WhoisContactInterface,
} from '@project/app/(main-layout)/tools/whois-lookup/_types/WhoisLookupTypes';

// Dependencies - Main Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import {
    DataSection,
    DataListSection,
    DataContainer,
    createDataFieldsFromObject,
} from '@project/app/(main-layout)/tools/_components/ToolDataRendering';

// Component - WhoisLookupResultsAnimatedList
export interface WhoisLookupResultsAnimatedListProperties {
    whoisLookupResultItems: WhoisLookupResultItemProperties[];
}
export function WhoisLookupResultsAnimatedList(properties: WhoisLookupResultsAnimatedListProperties) {
    // Function to determine if an item is in a negative state
    function isNegativeState(item: WhoisLookupResultItemProperties): boolean {
        return !item.isSuccess || !!item.errorCode;
    }

    // Function to render final actions with WHOIS-specific logic
    function renderFinalActions(item: WhoisLookupResultItemProperties, displayText: string): React.ReactNode {
        return (
            <div className="w-full">
                <div className="flex items-center">
                    {/* Only show copy button for error cases or when there is no WHOIS data */}
                    {(!item.whoisData || !item.isSuccess) && (
                        <CopyButton
                            className="ml-1.5"
                            iconClassName="h-3.5 w-3.5"
                            value={displayText}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: '"' + displayText + '"',
                            }}
                        />
                    )}
                </div>
                {/* Always show detailed WHOIS data when available */}
                {item.whoisData && renderWhoisDataDetails(item.whoisData)}
            </div>
        );
    }

    // Function to render a contact section using shared utilities
    function renderContactSection(title: string, contact: WhoisContactInterface): React.ReactNode {
        const contactFields = createDataFieldsFromObject(contact as Record<string, unknown>, {
            name: { label: 'Name' },
            organization: { label: 'Organization' },
            email: { label: 'Email' },
            phone: { label: 'Phone' },
            faxNo: { label: 'Fax' },
            fax: { label: 'Fax' },
            street: { label: 'Street' },
            city: { label: 'City' },
            stateProvince: { label: 'State/Province' },
            postalCode: { label: 'Postal Code' },
            country: { label: 'Country' },
        });

        return (
            <div>
                <DataSection title={title} fields={contactFields} />
                {/* Handle addresses array separately */}
                {contact.addresses && contact.addresses.length > 0 && (
                    <DataListSection title={`${title} - Addresses`} items={contact.addresses} />
                )}
            </div>
        );
    }

    // Function to render detailed WHOIS data using shared utilities
    function renderWhoisDataDetails(whoisData: WhoisDataInterface): React.ReactNode {
        const domainInfo = whoisData.domain;
        const contacts = whoisData.contacts;

        // Create domain information fields
        const domainFields = createDataFieldsFromObject(domainInfo as Record<string, unknown>, {
            registrar: { label: 'Registrar' },
            creationDate: { label: 'Creation Date', variant: 'date' },
            registryExpiryDate: { label: 'Expiration Date', variant: 'date' },
            updatedDate: { label: 'Updated Date', variant: 'date' },
            registrarWhoisServer: { label: 'WHOIS Server' },
            dnssec: { label: 'DNSSEC' },
            registryDomainId: { label: 'Registry Domain ID' },
            registrarIanaId: { label: 'Registrar IANA ID' },
        });

        return (
            <DataContainer>
                {/* Basic Domain Information */}
                {domainFields && domainFields.length > 0 && (
                    <DataSection title="Domain Information" fields={domainFields} />
                )}

                {/* Name Servers */}
                {domainInfo?.nameServers && domainInfo.nameServers.length > 0 && (
                    <DataListSection title="Name Servers" items={domainInfo.nameServers} />
                )}

                {/* Domain Status */}
                {domainInfo?.statuses && domainInfo.statuses.length > 0 && (
                    <DataListSection title="Domain Status" items={domainInfo.statuses} />
                )}

                {/* Contact Information Sections */}
                {contacts?.registrant && renderContactSection('Registrant Contact', contacts.registrant)}
                {contacts?.administrative && renderContactSection('Administrative Contact', contacts.administrative)}
                {contacts?.technical && renderContactSection('Technical Contact', contacts.technical)}
                {contacts?.billing && renderContactSection('Billing Contact', contacts.billing)}

                {/* Last Update Information */}
                {whoisData.lastUpdate && (
                    <DataSection
                        title="Last Updated"
                        fields={[
                            {
                                label: 'Last Update',
                                value: whoisData.lastUpdate,
                                variant: 'date',
                                copyLabel: 'Last Update',
                            },
                        ]}
                    />
                )}
            </DataContainer>
        );
    }

    // Render the component
    return (
        <ToolResultAnimatedList<WhoisLookupResultItemProperties>
            resultItems={properties.whoisLookupResultItems}
            renderFinalActions={renderFinalActions}
            isNegativeState={isNegativeState}
        />
    );
}
