'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Three.js
import * as Three from 'three';
import { useFrame } from '@react-three/fiber';

// Dependencies - Components
import { AtlasCircle } from '@project/app/(main-layout)/atlas/components/AtlasCircle';
import { useAtlasAnimations } from '@project/app/(main-layout)/atlas/components/useAtlasAnimations';
import { ParticleSystem } from '@project/app/(main-layout)/atlas/components/ParticleSystem';

// Dependencies - Theme
import { useTheme } from '@structure/source/theme/hooks/useTheme';
import { getAtlasEyeColors } from '@project/app/(main-layout)/atlas/components/AtlasTheme';

// Component - AtlasScene
export interface AtlasSceneProperties {
    mousePosition?: { x: number; y: number };
    particlesEnabled?: boolean;
    scale: number;
}
export function AtlasScene(properties: AtlasSceneProperties) {
    // Hooks
    const { themeClassName } = useTheme();

    // References
    const groupReference = React.useRef<Three.Group>(null);
    const sphereReference = React.useRef<Three.Mesh>(null);

    // Get colors based on theme
    const [colors, setColors] = React.useState(function () {
        return getAtlasEyeColors(themeClassName);
    });

    // Update colors when theme changes
    React.useEffect(
        function () {
            const newColors = getAtlasEyeColors(themeClassName);
            setColors(newColors);
        },
        [themeClassName],
    );

    // Get animations
    const {
        lineScale,
        handleClick,
        handleDoubleClick,
        frameUpdate,
        setTargetRotationFromNormalizedCoords,
        // animatingColor,
        reset, // Add the reset function
    } = useAtlasAnimations(groupReference, sphereReference);

    // Track last processed mouse position to avoid reprocessing same position
    const lastProcessedPosition = React.useRef({ x: 0, y: 0 });

    // State to track particle positions for eye tracking
    const [particlePosition, setParticlePosition] = React.useState<{ x: number; y: number } | null>(null);

    // Handle particle tracking
    const handleTrackParticle = React.useCallback(function (position: { x: number; y: number }) {
        setParticlePosition(position);
    }, []);

    // Update eye direction when mousePosition or particlePosition changes
    React.useEffect(
        function () {
            // If we're tracking a particle, prioritize that
            if(particlePosition) {
                // Check if this is a signal to return to default position (0,0)
                if(particlePosition.x === 0 && particlePosition.y === 0) {
                    console.log('👁️ Received reset signal from particle system');

                    // Clear the particle position to avoid future processing
                    setParticlePosition(null);

                    // Use the reset function to go back to default
                    // This handles all the necessary animation and logic
                    reset();
                }
                else {
                    console.log(
                        `👁️ Tracking particle at x: ${particlePosition.x.toFixed(2)}, y: ${particlePosition.y.toFixed(
                            2,
                        )}`,
                    );
                    setTargetRotationFromNormalizedCoords(particlePosition.x, particlePosition.y);
                }
                return;
            }

            const mousePosition = properties.mousePosition || { x: 0, y: 0 };

            // Otherwise handle mouse position as before
            // Only update if:
            // 1. The position is not at the origin (initial state) OR
            // 2. We're explicitly going back to origin/default (and previously were elsewhere)
            const positionChanged =
                mousePosition.x !== lastProcessedPosition.current.x ||
                mousePosition.y !== lastProcessedPosition.current.y;

            if(positionChanged) {
                // Remember this position
                lastProcessedPosition.current = { ...mousePosition };

                // Only send non-default positions to the animation system
                if(mousePosition.x !== 0 || mousePosition.y !== 0) {
                    console.log(`👁️ Looking at x: ${mousePosition.x.toFixed(2)}, y: ${mousePosition.y.toFixed(2)}`);
                    setTargetRotationFromNormalizedCoords(mousePosition.x, mousePosition.y);
                }
            }
        },
        [properties.mousePosition, particlePosition, setTargetRotationFromNormalizedCoords, reset],
    );

    // Animation frame update
    useFrame(frameUpdate);

    // Render the 3D scene
    return (
        <>
            {/* Atlas Eye */}
            <group
                ref={groupReference}
                position={[0, 0, 0]} // Ensure it's centered
                rotation={[0, 0, 0]} // Base rotation (will be updated by animation)
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                scale={properties.scale} // Make the entire eye 60% smaller
            >
                {/* Sphere */}
                <mesh
                    ref={sphereReference}
                    userData={{ isEye: true }} // Mark this as the eye for particle system
                >
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshBasicMaterial
                        color={colors.sphereColor}
                        toneMapped={false} // Ensure exact color display
                    />
                </mesh>

                {/* Longitude circle - perpendicular to XZ plane - hide join at back */}
                <AtlasCircle
                    color={colors.lineColor}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={lineScale}
                    startAngle={Math.PI - Math.PI / 4 - (3 * Math.PI) / 4} // Push back by an additional 135 degrees
                />

                {/* Latitude circle - perpendicular to XY plane - rotated with join at different position */}
                <AtlasCircle
                    color={colors.lineColor}
                    rotation={[Math.PI / 2, 0, Math.PI]}
                    scale={lineScale}
                    startAngle={Math.PI - Math.PI / 4} // Start from the back - 45 degrees
                />
            </group>

            {/* Particle System */}
            <ParticleSystem
                enabled={properties.particlesEnabled !== undefined ? properties.particlesEnabled : true}
                onTrackParticle={handleTrackParticle}
            />
        </>
    );
}
