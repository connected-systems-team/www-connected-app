'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { Theme } from '@structure/source/theme/ThemeTypes';

// Dependencies - Main Components
import { Tools } from '@project/app/(main-layout)/tools/Tools';
import { Link } from '@structure/source/common/navigation/Link';

// Dependencies - Hooks
import { readOnlyThemeAtom, readOnlyOperatingSystemThemeAtom } from '@structure/source/theme/ThemeProvider';

// Dependencies - Shared State
import { useAtomValue } from 'jotai';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { getRainbowHexColorForTheme, lightenColor } from '@structure/source/utilities/Color';

// Component - ToolsPage
export function ToolsPage() {
    const theme = useAtomValue(readOnlyThemeAtom);
    const operatingSystemTheme = useAtomValue(readOnlyOperatingSystemThemeAtom);
    const activeTheme = theme === Theme.OperatingSystem ? operatingSystemTheme : theme;
    // console.log('activeTheme', activeTheme);

    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="">Network Tools</h1>
            <p className="mt-4 text-sm text-foreground-secondary">
                Diagnose, monitor, and troubleshoot networks with essential Internet and IP utilities.
            </p>
            <hr className="my-6" />

            {/* Tool Cards */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Tools.map(function (tool, toolIndex) {
                    const rainbowHexColorForTheme = getRainbowHexColorForTheme(
                        toolIndex / Tools.length,
                        activeTheme == Theme.Dark ? 'dark' : 'light',
                    );
                    const lightenedRainbowHexColorForTheme = lightenColor(
                        rainbowHexColorForTheme,
                        0.2 * (activeTheme === Theme.Dark ? -1 : 1),
                    );

                    // Render the tool card
                    return (
                        <Link
                            key={toolIndex}
                            href={tool.urlPath}
                            variant="Unstyled"
                            className={mergeClassNames(
                                'flex w-full flex-col items-start justify-start rounded-xl border p-8',
                                tool.className,
                            )}
                            onMouseEnter={function (event) {
                                // Set the border color
                                event.currentTarget.style.borderColor = rainbowHexColorForTheme;
                            }}
                            onMouseLeave={function (event) {
                                // Unset the border color
                                event.currentTarget.style.borderColor = '';
                            }}
                            onMouseDown={function (event) {
                                event.currentTarget.style.borderColor = lightenedRainbowHexColorForTheme;
                            }}
                            onMouseUp={function (event) {
                                event.currentTarget.style.borderColor = rainbowHexColorForTheme;
                            }}
                        >
                            <tool.icon
                                size={24}
                                weight="regular"
                                className="text-content"
                                style={{
                                    color: rainbowHexColorForTheme,
                                }}
                                suppressHydrationWarning={true}
                            />
                            <h3 className="mt-4">{tool.title}</h3>
                            <p className="mt-2 text-sm text-foreground-secondary">{tool.description}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
