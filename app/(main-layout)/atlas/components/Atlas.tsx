'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Three.js
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

// Dependencies - Components
import { AtlasScene } from '@project/app/(main-layout)/atlas/components/AtlasScene';

// Component - Atlas
export interface AtlasInterface {
    particlesEnabled?: boolean;
}
export function Atlas(properties: AtlasInterface) {
    // State
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    // References
    const containerReference = React.useRef<HTMLDivElement>(null);
    const canvasReference = React.useRef<HTMLCanvasElement>(null);

    // Function to calculate field of view based on sphere radius and distance
    const calculateFov = React.useCallback(function (sphereRadius: number, distance: number) {
        return 2 * Math.atan(sphereRadius / distance) * (180 / Math.PI);
    }, []);

    // Calculate camera position based on size
    const cameraZ = 10;

    // Use a consistent FOV based on the calculation
    const fov = calculateFov(1, cameraZ);

    // Function to convert window coordinates to normalized coordinates
    const getNormalizedCoordinates = React.useCallback(function (clientX: number, clientY: number) {
        if(!canvasReference.current) return { x: 0, y: 0 };

        const boundingClientRectangle = canvasReference.current.getBoundingClientRect();
        const elementCenterX = boundingClientRectangle.left + boundingClientRectangle.width / 2;
        const elementCenterY = boundingClientRectangle.top + boundingClientRectangle.height / 2;
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        // Match original normalization logic
        const normalizedMouseX = (clientX - elementCenterX) / screenCenterX;
        const normalizedMouseY = (elementCenterY - clientY) / screenCenterY;

        return { x: normalizedMouseX, y: normalizedMouseY };
    }, []);

    // Function to handle click anywhere on the window
    const handleWindowClick = React.useCallback(
        function (event: MouseEvent) {
            // Get coordinates
            const { x, y } = getNormalizedCoordinates(event.clientX, event.clientY);
            setMousePosition({ x, y });
        },
        [getNormalizedCoordinates],
    );

    // Effect to setup resize observer and global click handlers
    React.useEffect(
        function () {
            // Add window click listeners
            window.addEventListener('click', handleWindowClick);

            // On unmount, remove the event listener
            return function () {
                window.removeEventListener('click', handleWindowClick);
            };
        },
        [handleWindowClick],
    );

    // Set up container size matching
    React.useEffect(function () {
        // Make container square so height will match width
        const updateContainerSize = function () {
            if(!containerReference.current) return;

            // Get the current width
            const width = containerReference.current.clientWidth;

            // Set the height to match width for a square aspect ratio
            containerReference.current.style.height = `${width}px`;
        };

        // Update container size initially
        updateContainerSize();

        // Listen for window resize events
        window.addEventListener('resize', updateContainerSize);

        // Clean up
        return function () {
            window.removeEventListener('resize', updateContainerSize);
        };
    }, []);

    // Render the component
    return (
        <div
            ref={containerReference}
            className="relative w-full"
            style={{
                minHeight: '75vh',
                maxHeight: '90vh',
            }}
        >
            <Canvas className="h-full w-full" gl={{ alpha: true }} ref={canvasReference}>
                <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={fov} near={0.1} far={1000} />
                <AtlasScene mousePosition={mousePosition} particlesEnabled={properties.particlesEnabled} />
            </Canvas>
        </div>
    );
}

// Export - Default
export default Atlas;
