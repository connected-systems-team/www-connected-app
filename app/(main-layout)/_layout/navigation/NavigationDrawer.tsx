'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import * as DialogPrimitive from '@radix-ui/react-dialog';

// Dependencies- Assets
import MenuButton from '@structure/assets/icons/navigation/MenuIcon.svg';
import CloseIcon from '@structure/assets/icons/navigation/CloseIcon.svg';

// Dependencies - Animation
import { useTransition, animated, config as reactSpringConfiguration, useSpring } from '@react-spring/web';

// Component - NavigationDrawer
export interface NavigationDrawerProperties {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    onOpen?: () => void;
}
export function NavigationDrawer(properties: NavigationDrawerProperties) {
    // State
    const internalOpenState = React.useState(false);
    const [open, setOpen] =
        properties.open !== undefined && properties.setOpen !== undefined
            ? [properties.open, properties.setOpen]
            : internalOpenState;

    // Transition for drawer animation
    const drawerTransition = useTransition(open, {
        from: {
            height: '0vh',
        },
        enter: {
            height: '100vh',
        },
        leave: {
            height: '0vh',
        },
        config: reactSpringConfiguration.default,
    });

    // Spring for overlay animation
    const [overlaySpring, overlaySpringApi] = useSpring(function () {
        return {
            opacity: 0,
        };
    });

    // Effect for the overlay animation
    const onOpenCallback = properties.onOpen;
    React.useEffect(
        function () {
            // If the drawer is open
            if(open) {
                // Set body to overflow hidden
                document.body.style.overflow = 'hidden';
            }
            // If the drawer is closed
            else {
                // Set body to overflow auto
                document.body.style.overflow = 'auto';
            }

            // Start the overlay animation
            overlaySpringApi.start({
                opacity: open ? 1 : 0,
                onRest: function () {
                    if(onOpenCallback && open) {
                        onOpenCallback();
                    }
                },
            });
        },
        [open, overlaySpringApi, onOpenCallback],
    );

    // Render the component
    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            {/* Show the menu open trigger when the drawer is closed */}
            {!open ? (
                <DialogPrimitive.Trigger className="pointer-events-auto flex items-center justify-center">
                    <MenuButton alt="Menu" width={24} height={24} className="" />
                </DialogPrimitive.Trigger>
            ) : (
                // Show a close button when the drawer is open
                <CloseIcon
                    alt="Close"
                    width={24}
                    height={24}
                    className="pointer-events-auto cursor-pointer object-contain"
                    onClick={function () {
                        setOpen(false);
                    }}
                />
            )}
            {drawerTransition(function (style, show) {
                return (
                    show && (
                        <>
                            <DialogPrimitive.Content
                                asChild
                                forceMount
                                onPointerDownOutside={function (event) {
                                    event.preventDefault();
                                }}
                            >
                                <animated.div
                                    style={{ height: style.height }}
                                    className="fixed inset-0 top-phi-base-2 -z-10 h-full w-full overflow-x-hidden overflow-y-scroll border-b bg-white px-6 dark:bg-dark"
                                >
                                    {properties.children}
                                </animated.div>
                            </DialogPrimitive.Content>
                            <DialogPrimitive.Overlay forceMount asChild>
                                <animated.div
                                    style={{ opacity: overlaySpring.opacity }}
                                    className="fixed inset-0 top-phi-base-2 -z-20 h-full w-full overflow-hidden border-b bg-dark/50 px-6"
                                />
                            </DialogPrimitive.Overlay>
                        </>
                    )
                );
            })}
        </DialogPrimitive.Root>
    );
}
