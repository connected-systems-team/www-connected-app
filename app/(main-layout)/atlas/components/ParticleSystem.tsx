'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';
import * as Three from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';

// Type - Particle
export interface ParticleInterface {
    id: number;
    position: Three.Vector3;
    velocity: Three.Vector3;
    color: Three.Color;
    size: number;
    lifetime: number;
    age: number;
}

// Unique ID for particles
let particleIdCounter = 0;

// Component - ParticleSystem
export interface ParticleSystemProperties {
    enabled?: boolean;
    onTrackParticle?: (position: { x: number; y: number }) => void;
}
export function ParticleSystem(properties: ParticleSystemProperties) {
    // State
    const [particles, setParticles] = React.useState<ParticleInterface[]>([]);

    // References
    const groupReference = React.useRef<Three.Group>(null);
    const hasActiveParticlesReference = React.useRef(false);
    const wasVisibleReference = React.useRef(true);

    // Function to create a new particle at specified normalized coordinates
    const createParticle = React.useCallback(
        function (normalizedX: number, normalizedY: number) {
            if(properties.enabled === false) return;

            // Convert normalized coordinates to scene coordinates
            const x = normalizedX * 3; // Scale to make particles more visible in the scene
            const y = normalizedY * 3;
            const z = 0.1; // Start very close to the eye for better visual effect

            // Create multiple particles with small variations
            const newParticles: ParticleInterface[] = [];
            const particleCount = 3; // Create 3 particles at once

            for(let i = 0; i < particleCount; i++) {
                // Add small random offsets to position and velocity
                const offsetX = (Math.random() - 0.5) * 0.1;
                const offsetY = (Math.random() - 0.5) * 0.1;
                const speedVariation = 0.005 * Math.random();

                // Create a new particle with small variations
                const newParticle: ParticleInterface = {
                    id: particleIdCounter++,
                    position: new Three.Vector3(x + offsetX, y + offsetY, z),
                    velocity: new Three.Vector3(
                        offsetX * 0.01, // Slight horizontal drift
                        (-0.015 - speedVariation) * 0.75, // 25% slower fall
                        (-0.002 - speedVariation * 0.2) * 0.75, // Very slow movement away from camera
                    ),
                    color: new Three.Color(
                        0.8 + Math.random() * 0.2, // Slight red variation
                        0.2 + Math.random() * 0.1, // Slight green variation
                        0.2 + Math.random() * 0.1, // Slight blue variation
                    ),
                    size: 0.025 + Math.random() * 0.025, // Random size between 0.025 and 0.05
                    lifetime: 10 + Math.random() * 5, // Live for 10-15 seconds
                    age: 0,
                };

                newParticles.push(newParticle);
            }

            console.log(
                `🔴 Created ${particleCount} particles at x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, z: ${z.toFixed(2)}`,
            );

            // Add the new particles to the state
            setParticles(function (prevParticles) {
                return [...prevParticles, ...newParticles];
            });
        },
        [properties.enabled],
    );

    // Function to handle double click to create a particle
    const handleSceneDoubleClick = React.useCallback(
        function (event: ThreeEvent<MouseEvent>) {
            event.stopPropagation();

            // Check if the click was on the eye
            if(event.object.userData.isEye) {
                return; // Don't create particle if clicked on eye
            }

            // Get the canvas element
            const canvas = event.nativeEvent.target as HTMLCanvasElement;
            const canvasRect = canvas.getBoundingClientRect();

            // Calculate the position of the mouse in canvas normalized coordinates (-1 to +1)
            // These are the coordinates Three.js uses for raycasting
            const canvasX = ((event.nativeEvent.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
            const canvasY = -((event.nativeEvent.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;

            // Get the Three.js camera from the scene
            const camera = event.camera as Three.PerspectiveCamera;

            // Create a ray from the camera through the mouse point
            const raycaster = new Three.Raycaster();
            raycaster.setFromCamera(new Three.Vector2(canvasX, canvasY), camera);

            // Create a plane at z=0.1 (where we want the particles to appear)
            const plane = new Three.Plane(new Three.Vector3(0, 0, 1), -0.1);

            // Find where the ray intersects the plane
            const intersection = new Three.Vector3();
            raycaster.ray.intersectPlane(plane, intersection);

            // Log the exact cursor position
            console.log(
                `🔴 Mouse cursor at scene position: ${intersection.x.toFixed(2)}, ${intersection.y.toFixed(
                    2,
                )}, ${intersection.z.toFixed(2)}`,
            );

            // Create a particle at the exact position of the cursor
            createParticle(intersection.x / 3, intersection.y / 3);
        },
        [createParticle],
    );

    // Animation loop for particles
    useFrame(function (state, delta) {
        // Determine if we have particles to track
        const enabled = properties.enabled !== undefined ? properties.enabled : true;
        const currentlyHasParticles = enabled && particles.length > 0;

        // Check if our tracking state has changed
        if(hasActiveParticlesReference.current !== currentlyHasParticles) {
            hasActiveParticlesReference.current = currentlyHasParticles;

            // If we just lost all particles, send the reset signal
            if(!currentlyHasParticles && properties.onTrackParticle) {
                console.log('🔴 Particles tracking state changed to inactive - sending reset signal');
                properties.onTrackParticle({ x: 0, y: 0 });
            }
        }

        // If we have no particles, there's nothing more to do
        if(!currentlyHasParticles) {
            return;
        }

        // Get the camera to check if particles are in view
        const camera = state.camera;

        // Define the canvas boundaries for visibility check (in normalized device coordinates)
        const canvasBounds = {
            left: -0.9, // Slightly inset from -1
            right: 0.9, // Slightly inset from 1
            top: 0.9, // Slightly inset from 1
            bottom: -0.9, // Slightly inset from -1
        };

        // Track the closest active particle position for eye tracking
        let closestPosition: Three.Vector3 | null = null;
        let closestDistance = Infinity;
        let allParticlesOutOfView = true;

        // Helper function to check if a particle is visible in the camera view
        const isParticleVisible = function (position: Three.Vector3): boolean {
            // Create a vector to hold projected coordinates
            const screenPosition = position.clone().project(camera);

            // Check if position is within canvas bounds (NDC: -1 to 1 for both x and y)
            return (
                screenPosition.x >= canvasBounds.left &&
                screenPosition.x <= canvasBounds.right &&
                screenPosition.y >= canvasBounds.bottom &&
                screenPosition.y <= canvasBounds.top &&
                screenPosition.z >= -1 &&
                screenPosition.z <= 1 // Z must be between -1 and 1 in NDC space
            );
        };

        // Update particles
        setParticles(function (previousParticles) {
            // Filter and update particles
            const updatedParticles = previousParticles
                .map(function (particle) {
                    // Update age
                    const newAge = particle.age + delta;

                    // Remove particles that have lived their lifetime
                    if(newAge >= particle.lifetime) {
                        return null;
                    }

                    // Update position based on velocity
                    const newPosition = particle.position.clone().add(
                        particle.velocity.clone().multiplyScalar(delta * 60), // Adjust for frame rate
                    );

                    // Check if particle is in camera view using our helper
                    const inView = isParticleVisible(newPosition);

                    // If any particle is in view, we'll track it
                    if(inView) {
                        allParticlesOutOfView = false;

                        // Check if this particle is closer to the center than the current closest
                        const distanceToCenter = new Three.Vector3().distanceTo(newPosition);
                        if(distanceToCenter < closestDistance) {
                            closestDistance = distanceToCenter;
                            closestPosition = newPosition.clone(); // Store just the position vector
                        }
                    }

                    // Keep particles alive as long as they're within reasonable distance
                    // of the origin, regardless of whether they're in camera view
                    const distanceFromOrigin = newPosition.length();
                    if(distanceFromOrigin > 15) {
                        return null;
                    }

                    // Also remove particles that have been out of view for too long
                    // (helps with particles that are stuck behind or beside the camera)
                    if(!inView && newAge > 5) {
                        return null;
                    }

                    // Return updated particle
                    return {
                        ...particle,
                        position: newPosition,
                        age: newAge,
                    };
                })
                .filter(Boolean) as ParticleInterface[]; // Filter out null values (expired particles)

            // Track whether particles are visible
            const hasVisibleParticles = !allParticlesOutOfView;

            // If visibility state changed from visible to invisible, send reset signal
            if(wasVisibleReference.current && !hasVisibleParticles) {
                console.log('🔴 All particles are now out of view - sending reset signal');
                properties.onTrackParticle?.({ x: 0, y: 0 });
                wasVisibleReference.current = false;
                // Always return the updated particles instead of an early return
                return updatedParticles;
            }

            // Update visibility state
            wasVisibleReference.current = hasVisibleParticles;

            // Tell the eye to track the closest particle position that's in view
            if(hasVisibleParticles && properties.onTrackParticle && closestPosition) {
                // Convert position to normalized coordinates
                const normalizedX = closestPosition.x / 3; // Reverse scaling from createParticle
                const normalizedY = closestPosition.y / 3;

                properties.onTrackParticle({ x: normalizedX, y: normalizedY });
            }

            return updatedParticles;
        });
    });

    // Add a scene-wide plane to catch double clicks
    return (
        <group ref={groupReference}>
            {/* Invisible plane to catch clicks - spans the entire viewable area */}
            <mesh onDoubleClick={handleSceneDoubleClick} visible={false} position={[0, 0, -4]}>
                <planeGeometry args={[20, 20]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Render each particle */}
            {particles.map(function (particle) {
                return (
                    <mesh
                        key={particle.id}
                        position={particle.position}
                        scale={[particle.size, particle.size, particle.size]}
                    >
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshBasicMaterial
                            color={particle.color}
                            toneMapped={false}
                            transparent
                            opacity={Math.min(1, 2 - (particle.age / particle.lifetime) * 2)} // Fade out at end of life
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
