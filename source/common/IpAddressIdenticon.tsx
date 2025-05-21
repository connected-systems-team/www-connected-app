'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Popover } from '@structure/source/common/popovers/Popover';
import { Tip } from '@structure/source/common/popovers/Tip';
// import { TipIcon } from '@structure/source/common/popovers/TipIcon';

// Dependencies - Animation
import { useSpring, useSprings, animated, config as springConfiguration } from '@react-spring/web';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - IpAddressIdenticon
export interface IpAddressIdenticonProperties {
    className?: string;
    ipAddress: string;
}
export function IpAddressIdenticon(properties: IpAddressIdenticonProperties) {
    // State
    const [shouldAnimate, setShouldAnimate] = React.useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    // Effect to run the animation after the component mounts
    React.useEffect(function () {
        setShouldAnimate(true);
    }, []);

    // Function to get the colors for the IP address
    function getColors(ipAddress: string) {
        // Split the IP address into octets
        const octets = ipAddress.split('.').map((octet) => parseInt(octet, 10));

        // Convert the octets to colors using HSL, rainbow style
        function integerToColor(value: number) {
            const hue = (value / 255) * 360;
            return `hsl(${hue}, 100%, 50%)`;
        }

        return octets.map(integerToColor);
    }

    // Get the colors for the IP address
    const colors = getColors(properties.ipAddress);

    // Create springs for all lines at once
    const lineSprings = useSprings(
        colors.length,
        colors.map((_, index) => ({
            from: { scaleY: 0 },
            to: { scaleY: shouldAnimate ? 1 : 0 },
            delay: index * 100, // 100ms delay between each line
            config: springConfiguration.gentle,
        })),
    );

    // Spring for hover effect
    const hoverSpring = useSpring({
        scale: hoveredIndex !== null ? 1.1 : 1,
        config: { mass: 1, tension: 300, friction: 10 },
    });

    // Render the component
    return (
        <Popover
            side="left"
            align="start"
            content={
                <div className="px-5 py-4 text-sm shadow-xl md:max-w-96">
                    <p className="mb-1 font-medium">IP Address Identicon</p>
                    <p className="mb-0.5">
                        The IP Address Identicon is a visual representation of an IP address using the color spectrum of
                        the rainbow{' '}
                        <Tip content="Red, Orange, Yellow, Green, Blue, Indigo, Violet">
                            <span>(ROYGBIV)</span>
                        </Tip>
                        .
                    </p>
                    <p className="mb-0.5">
                        Each line represents each of the four octets of the IP address, creating a unique color pattern
                        for easy recognition. The value of each octet ranges from 0 to 255, where 0 is represented by
                        red and 255 is represented by violet.
                    </p>
                    <p className="mb-0.5"></p>
                </div>
            }
        >
            <div
                className={mergeClassNames(
                    'flex h-14 w-28 cursor-pointer items-end justify-between overflow-hidden rounded-extra-small border bg-dark+6 px-4 py-3 hover:bg-dark+3',
                    properties.className,
                )}
            >
                {lineSprings.map((spring, index) => (
                    <animated.div
                        key={index}
                        style={{
                            ...spring,
                            backgroundColor: colors[index],
                            transformOrigin: 'center',
                            scale: hoveredIndex === index ? hoverSpring.scale : 1,
                        }}
                        className="h-full w-2.5 rounded-medium"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </div>
        </Popover>
    );
}

// Export - Default
export default IpAddressIdenticon;
