'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { usePathname as useUrlPath } from 'next/navigation';

// Dependencies - Main Components
import {
    NavigationTrailLinkInterface,
    NavigationTrailProperties,
    NavigationTrail,
} from '@structure/source/common/navigation/trail/NavigationTrail';
import { useToolsNavigationLinks } from '@project/app/(main-layout)/tools/Tools';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { titleCase } from '@structure/source/utilities/String';

// Component - ToolsNavigationTrail
export function ToolsNavigationTrail(properties: NavigationTrailProperties) {
    // Get the current pathname from the URL using the usePathname hook
    const urlPath = useUrlPath() ?? '';

    // Get filtered tools navigation links based on user role
    const toolsNavigationLinks = useToolsNavigationLinks();

    // Function to get sibling navigation trail links for a given path
    const getSiblingNavigationTrailLinks = React.useCallback(function (
        path: string,
        links: NavigationTrailLinkInterface[],
    ): NavigationTrailLinkInterface[] {
        const siblingNavigationTrailLinks: NavigationTrailLinkInterface[] = [];

        // Loop over tools navigation links
        for(const internalNavigationLink of links) {
            // Check if the link matches the path
            if(internalNavigationLink.href !== path && internalNavigationLink.href.startsWith(path)) {
                siblingNavigationTrailLinks.push({
                    ...internalNavigationLink,
                });
            }
        }

        return siblingNavigationTrailLinks;
    }, []);

    // Function to generate links from pathname using the pathname and tools navigation links
    const generateNavigationTrailLinksUsingPathname = React.useCallback(
        function () {
            const urlPathSegments = urlPath.split('/').filter(Boolean);
            // console.log('generateNavigationTrailLinksUsingPathname', pathSegments);
            const navigationTrailLinks: NavigationTrailLinkInterface[] = [];
            let cumulativePath = '';

            // Loop over each path segment
            let lastUrlPathSegmentLinks: NavigationTrailLinkInterface[] = toolsNavigationLinks;
            for(let urlPathSegmentIndex = 0; urlPathSegmentIndex < urlPathSegments.length; urlPathSegmentIndex++) {
                const urlPathSegment = urlPathSegments[urlPathSegmentIndex]!;
                const siblingNavigationTrailLinks = getSiblingNavigationTrailLinks(
                    cumulativePath,
                    lastUrlPathSegmentLinks,
                );

                // If we are not on the first segment, add the sibling links to the navigation trail
                if(urlPathSegmentIndex > 0) {
                    lastUrlPathSegmentLinks = siblingNavigationTrailLinks.flatMap((link) => link.links ?? []);
                }

                // Add the path segment to the cumulative path
                cumulativePath += `/${urlPathSegment}`;

                // Add the path segment to the navigation trail
                navigationTrailLinks.push({
                    title: titleCase(urlPathSegment.replaceAll('-', ' ')), // Format the segment into a title
                    href: cumulativePath,
                    links: siblingNavigationTrailLinks,
                });
            }

            // Look forward to see if there are any possible tools navigation links after this segment
            const siblingNavigationTrailLinks = getSiblingNavigationTrailLinks(cumulativePath, lastUrlPathSegmentLinks);
            if(siblingNavigationTrailLinks.length > 0) {
                navigationTrailLinks.push({
                    title: '',
                    href: '',
                    links: siblingNavigationTrailLinks,
                });
            }

            return navigationTrailLinks;
        },
        [urlPath, getSiblingNavigationTrailLinks, toolsNavigationLinks],
    );

    // Use provided links or generate from pathname
    const navigationTrailLinks = generateNavigationTrailLinksUsingPathname();

    // Render the component
    return (
        <NavigationTrail
            links={navigationTrailLinks}
            {...properties}
            className={mergeClassNames('mb-8', properties.className)}
        />
    );
}
