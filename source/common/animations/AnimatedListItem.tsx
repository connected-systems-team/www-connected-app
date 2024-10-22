'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';

// Dependencies - Animation
import { useSpring, animated, config as springConfiguration } from '@react-spring/web';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import useMeasure from 'react-use-measure';

// Component - AnimatedListItem
export interface AnimatedListItemInterface {
    content: React.ReactNode;

    // Final item
    isFinal?: boolean;
    finalDiscClassName?: string;
    finalDiscIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    finalDiscIconClassName?: string;

    // Computed by AnimatedList
    isFirst: boolean;
    isActive: boolean;
    hasNextItem: boolean;
}
export function AnimatedListItem(properties: AnimatedListItemInterface) {
    // State
    const [showContent, setShowContent] = React.useState(properties.isFirst);

    // References
    const [contentDivReference, { height: contentDivHeight }] = useMeasure();

    // Defaults
    const discScaleMaximum = 1.5;
    const oneLineContentHeight = 24;
    const lines = contentDivHeight ? contentDivHeight / oneLineContentHeight : 1;
    const lineHeight = oneLineContentHeight * lines + 4;
    const finalClassName = properties.finalDiscClassName;
    const FinalIcon = properties.finalDiscIcon || CheckCircledIcon;
    const finalIconClassName = properties.finalDiscIconClassName;

    // Effect to delay showing the disc if not the first item
    React.useEffect(
        function () {
            if(!properties.isFirst) {
                // This delay should wait for the line drawing to the center of the disc to finish animating
                const timer = setTimeout(function () {
                    setShowContent(true);
                }, 500);

                return function () {
                    clearTimeout(timer);
                };
            }
        },
        [properties.isFirst],
    );

    // Spring to animate the disc
    const [discSpring, discSpringApi] = useSpring(function () {
        return {
            scale: properties.isFirst ? 0 : 0,
            config: springConfiguration.wobbly,
        };
    });

    // Effect to start or stop the disc spring
    React.useEffect(
        function () {
            // If the content is shown
            if(showContent) {
                // If the item is active
                if(properties.isActive && !properties.isFinal) {
                    // Start the disc spring
                    discSpringApi.start({
                        // Scale up to the maximum first
                        scale: discScaleMaximum,
                        // When the scale reaches discScaleMaximum, start the rest of the animation
                        onRest: function () {
                            // Start the disc spring animation
                            discSpringApi.start({
                                to: [{ scale: 1 }, { scale: discScaleMaximum }],
                                loop: true,
                            });
                        },
                    });
                }
                // If the item is final
                else if(properties.isFinal) {
                    // Start the disc spring
                    discSpringApi.start({
                        scale: 3,
                        onRest: function () {
                            discSpringApi.stop();
                        },
                    });
                }
                // If the item is not active
                else {
                    // Stop the disc spring
                    discSpringApi.stop();
                    discSpringApi.start({
                        scale: 1,
                        onRest: function () {
                            discSpringApi.stop();
                        },
                    });
                }
            }
        },
        [showContent, properties.isActive, properties.isFinal, discSpringApi],
    );

    // Spring to animate the line
    const lineSpring = useSpring({
        from: { height: 0 },
        to: { height: properties.hasNextItem ? lineHeight : 0 },
        config: springConfiguration.slow,
    });

    // Spring to animate the text
    const textSpring = useSpring({
        opacity: showContent ? 1 : 0,
        config: springConfiguration.slow,
    });

    // Render the component
    return (
        <div className="flex items-start">
            {/* Left Line and Discs */}
            <div className="relative flex h-[24px] items-center">
                {/* Disc */}
                {!properties.isFinal && (
                    <animated.div
                        style={discSpring}
                        className="flex h-[7px] w-[7px] rounded-full bg-dark dark:bg-light"
                    />
                )}
                {properties.isFinal && (
                    <animated.div
                        style={discSpring}
                        className={mergeClassNames(
                            'flex h-[7px] w-[7px] items-center justify-center rounded-full bg-green-500 text-light dark:border-none dark:text-light',
                            finalClassName,
                        )}
                    >
                        <FinalIcon className={mergeClassNames('h-full w-full', finalIconClassName)} />
                    </animated.div>
                )}

                {/* Line */}
                {properties.hasNextItem && (
                    <animated.div
                        style={lineSpring}
                        className="absolute left-[3px] top-[12px] w-[1px] bg-dark dark:bg-light"
                    />
                )}
            </div>

            {/* Content */}
            <animated.div ref={contentDivReference} style={textSpring} className="ml-3.5 flex items-center">
                {properties.content}
                {/* {JSON.stringify(properties)} */}
            </animated.div>
        </div>
    );
}
