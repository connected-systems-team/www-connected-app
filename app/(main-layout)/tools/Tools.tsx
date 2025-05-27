'use client'; // This component uses client-only features

// Dependencies - Assets
import {
    Icon,
    Broadcast,
    // AppWindow,
    // Mailbox,
    GlobeSimple,
    CellTower,
    // GpsFix,
    // Path,
    Binoculars,
    FingerprintSimple,
    RowsPlusTop,
    // GlobeSimpleX,
    // Barcode,
} from '@phosphor-icons/react';

// Dependencies - Main Components
import { NavigationTrailLinkInterface } from '@structure/source/common/navigation/trail/NavigationTrail';

// Type - ToolLinkProperties
export interface ToolLinkProperties {
    title: string;
    href: string;
    role?: 'Administrator';
}

// Type - ToolProperties
export interface ToolProperties {
    className?: string;
    urlPath: string;
    icon: Icon;
    title: string;
    description: string;
    links?: ToolLinkProperties[]; // Optional sub-navigation links
}

// Tool
export const Tools: ToolProperties[] = [
    {
        urlPath: '/tools/port-checker',
        icon: Broadcast,
        title: 'Port Checker',
        description: 'Check if a specific port on a host is open and accessible.',
        links: [
            {
                title: 'History',
                href: '/tools/port-checker/history',
            },
            {
                title: 'Test',
                href: '/tools/port-checker/test',
                role: 'Administrator',
            },
        ],
    },
    // {
    //     urlPath: '/tools/curl',
    //     icon: AppWindow,
    //     title: 'cURL',
    //     description: 'Send HTTP requests to view server responses or debug endpoints.',
    // },
    // {
    //     urlPath: '/tools/mx-lookup',
    //     icon: Mailbox,
    //     title: 'MX Lookup',
    //     description: 'Look up vendor or manufacturer details of a MAC address.',
    // },
    {
        urlPath: '/tools/dns-lookup',
        icon: GlobeSimple,
        title: 'DNS Lookup',
        description: 'Resolve a domain name to its corresponding IP address.',
    },
    // {
    //     urlPath: '/tools/reverse-dns-lookup',
    //     icon: GlobeSimple,
    //     title: 'Reverse DNS Lookup',
    //     description: 'Retrieve the domain name linked to a specific IP address.',
    // },
    {
        urlPath: '/tools/ping',
        icon: CellTower,
        title: 'Ping',
        description: 'Test the reachability of a host and measure response time.',
    },
    // {
    //     urlPath: '/tools/ip-geolocation',
    //     icon: GpsFix,
    //     title: 'IP Geolocation',
    //     description: 'Identify the geographic location of an IP address.',
    // },
    // {
    //     urlPath: '/tools/trace-route',
    //     icon: Path,
    //     title: 'Trace Route',
    //     description: 'Map the path and latency of packets to a destination host.',
    // },
    {
        urlPath: '/tools/whois-lookup',
        icon: Binoculars,
        title: 'WHOIS Lookup',
        description: 'Fetch domain registration and ownership details.',
    },
    {
        urlPath: '/tools/ssl-tls-checker',
        icon: FingerprintSimple,
        title: 'SSL/TLS Checker',
        description: 'Inspect the validity and security of a domain’s SSL certificate.',
    },
    {
        urlPath: '/tools/subnet-calculator',
        icon: RowsPlusTop,
        title: 'Subnet Calculator',
        description: 'Calculate IP ranges, subnets, and masks for a given network.',
    },
    // {
    //     urlPath: '/tools/blacklist-check',
    //     icon: GlobeSimpleX,
    //     title: 'Blacklist Check',
    //     description: 'Detect whether an IP or domain is listed on known blacklists.',
    // },
    // {
    //     urlPath: '/tools/mac-address-lookup',
    //     icon: Barcode,
    //     title: 'MAC Address Lookup',
    //     description: 'Look up vendor or manufacturer details of a MAC address.',
    // },
];

// Function to generate tools navigation links from the Tools array
export function generateToolsNavigationLinks(): NavigationTrailLinkInterface[] {
    return Tools.map(function (tool) {
        const navigationLink: NavigationTrailLinkInterface = {
            title: tool.title,
            href: tool.urlPath,
        };

        // Add sub-links if the tool has them
        if(tool.links && tool.links.length > 0) {
            navigationLink.links = tool.links.map(function (link) {
                return {
                    title: link.title,
                    href: link.href,
                };
            });
        }

        return navigationLink;
    });
}

// Tools Navigation Links
export const ToolsNavigationLinks: NavigationTrailLinkInterface[] = generateToolsNavigationLinks();
