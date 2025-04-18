'use client'; // This hook uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Three
import * as Three from 'three';
import { ThreeEvent } from '@react-three/fiber';

// Animation hooks
export function useAtlasAnimations(
    groupReference: React.RefObject<Three.Group>,
    sphereReference: React.RefObject<Three.Mesh>,
) {
    // State
    const [isMoving, setIsMoving] = React.useState(false);
    const [isBlinking, setIsBlinking] = React.useState(false);
    const [lineScale, setLineScale] = React.useState(1);
    const [currentRotation, setCurrentRotation] = React.useState({ x: 0.265, y: 0.265 });
    const [targetRotation, setTargetRotation] = React.useState({ x: 0.265, y: 0.265 });
    const [animatingColor, setAnimatingColor] = React.useState(false);

    // References
    const resetTimeoutIdReference = React.useRef<NodeJS.Timeout | null>(null);
    const animationFrameReference = React.useRef<number | null>(null);
    const originalColorReference = React.useRef<Three.Color | null>(null);
    const firstClickReference = React.useRef(true);

    // Cleanup animations on unmount
    React.useEffect(function () {
        return function () {
            if(resetTimeoutIdReference.current) {
                clearTimeout(resetTimeoutIdReference.current);
            }

            if(animationFrameReference.current) {
                cancelAnimationFrame(animationFrameReference.current);
            }
        };
    }, []);

    // Get random blink interval (4-8 seconds)
    const getRandomBlinkInterval = React.useCallback(function () {
        const minInterval = 4000;
        const maxInterval = 8000;
        return Math.floor(Math.random() * (maxInterval - minInterval) + minInterval);
    }, []);

    // Define a reference for the scheduleRandomBlink function to avoid circular dependencies
    const scheduleRandomBlinkReference = React.useRef<(() => void) | null>(null);

    // Utility function to apply easing
    const easeInOutCubic = React.useCallback(function (t: number): number {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }, []);

    // Blink animation - matches the original implementation
    const blink = React.useCallback(
        function (once = false) {
            if(isBlinking) return;

            // Limited logging to reduce console noise
            if(Math.random() < 0.1) {
                console.log(once ? '👁️ Blinking once' : '👁️ Random blinking');
            }

            const startScale = 1;
            const endScale = 0.1;
            const duration = 350; // milliseconds - matches original
            const startTime = Date.now();

            setIsBlinking(true);

            const animateBlink = function () {
                const elapsedTime = Date.now() - startTime;
                const progress = elapsedTime / duration;

                if(progress < 1) {
                    let scale;

                    if(elapsedTime < duration / 2) {
                        // Blink closed - first half
                        scale = startScale + (endScale - startScale) * (elapsedTime / (duration / 2));
                    }
                    else {
                        // Blink open - second half
                        scale = endScale + (startScale - endScale) * ((elapsedTime - duration / 2) / (duration / 2));
                    }

                    setLineScale(scale);
                    animationFrameReference.current = requestAnimationFrame(animateBlink);
                }
                else {
                    // Blink complete
                    setLineScale(startScale);
                    setIsBlinking(false);

                    if(!once && scheduleRandomBlinkReference.current) {
                        // Schedule next random blink only if we're not doing a one-time blink
                        const interval = getRandomBlinkInterval();
                        // console.log(`Next blink in ${Math.round(interval)}ms`);
                        setTimeout(scheduleRandomBlinkReference.current, interval);
                    }
                }
            };

            // Start the animation
            animationFrameReference.current = requestAnimationFrame(animateBlink);
        },
        [isBlinking, getRandomBlinkInterval],
    );

    // Schedule a random blink
    const scheduleRandomBlink = React.useCallback(
        function () {
            if(!isMoving && !isBlinking) {
                blink(false);
            }
            else {
                // If we can't blink now (moving or already blinking), try again later
                setTimeout(scheduleRandomBlink, getRandomBlinkInterval());
            }
        },
        [isMoving, isBlinking, blink, getRandomBlinkInterval],
    );

    // Update the reference to the current scheduleRandomBlink function
    React.useEffect(
        function () {
            scheduleRandomBlinkReference.current = scheduleRandomBlink;
        },
        [scheduleRandomBlink],
    );

    // Set up random blinking on mount
    React.useEffect(
        function () {
            const blinkTimeoutId = setTimeout(scheduleRandomBlink, getRandomBlinkInterval());

            return function () {
                clearTimeout(blinkTimeoutId);
            };
        },
        [scheduleRandomBlink, getRandomBlinkInterval],
    );

    // Reset to default position - matches original implementation
    const reset = React.useCallback(
        function () {
            // Only log occasionally to reduce console noise
            if(Math.random() < 0.2) {
                console.log('👁️ Returning to default position');
            }

            // Define default rotation inside callback to avoid dependency
            const defaultRotation = { x: 0.265, y: 0.265 };

            // Set target rotation to default
            setTargetRotation(defaultRotation);

            // Clear isMoving flag to allow blinking again
            setIsMoving(false);

            // Blink after reset - matches original 1500ms delay
            setTimeout(function () {
                blink(true);
            }, 1500);
        },
        [blink],
    );

    // Convert normalized coordinates to eye rotation - improved accuracy
    const setTargetRotationFromNormalizedCoords = React.useCallback(
        function (normalizedX: number, normalizedY: number) {
            if(!groupReference.current) return;

            // Set new target rotation - map the point to an angle
            const maxAngle = Math.PI / 4; // Maximum rotation angle - matches original

            // Apply rotation in the correct direction
            setTargetRotation({
                x: Math.max(-maxAngle, Math.min(maxAngle, normalizedY * maxAngle)) * -1,
                y: Math.max(-maxAngle, Math.min(maxAngle, normalizedX * maxAngle)),
            });

            // Clear any existing reset timeout
            if(resetTimeoutIdReference.current) {
                console.log('👁️ Clearing previous reset timeout');
                clearTimeout(resetTimeoutIdReference.current);
            }

            // Create a new reset timeout - 5 seconds matches original
            console.log('👁️ Setting reset timeout for 5 seconds');
            resetTimeoutIdReference.current = setTimeout(reset, 5000);

            // Blink after the eye is clicked - matches original 750ms delay
            if(firstClickReference.current) {
                firstClickReference.current = false;
                setTimeout(function () {
                    blink(true);
                }, 750);
            }
        },
        [reset, blink, groupReference],
    );

    // Handle click to change eye direction - improved for accuracy
    const handleClick = React.useCallback(
        function (event: ThreeEvent<MouseEvent>) {
            event.stopPropagation();

            if(!groupReference.current) return;

            // Get normalized mouse coordinates for the window
            const canvasBounds =
                event.nativeEvent.target instanceof HTMLElement
                    ? event.nativeEvent.target.getBoundingClientRect()
                    : new DOMRect();

            const canvasCenterX = canvasBounds.width / 2;
            const canvasCenterY = canvasBounds.height / 2;
            const canvasMouseX = event.nativeEvent.clientX - canvasBounds.left;
            const canvasMouseY = event.nativeEvent.clientY - canvasBounds.top;

            const normalizedMouseX = (canvasMouseX - canvasCenterX) / canvasCenterX;
            const normalizedMouseY = (canvasMouseY - canvasCenterY) / canvasCenterY;

            // Use the shared method for setting rotation from normalized coordinates
            setTargetRotationFromNormalizedCoords(normalizedMouseX, normalizedMouseY);
        },
        [setTargetRotationFromNormalizedCoords, groupReference],
    );

    // Spin animation - improved to match original behavior
    const spin = React.useCallback(
        function (xAxis = false, yAxis = true, duration = 2500) {
            if(!groupReference.current) return;

            // Keep track of this specific animation
            const spinActiveReference = { current: true };

            // Store starting rotations
            const startRotationX = currentRotation.x;
            const startRotationY = currentRotation.y;

            // Define ending rotations - full 360° rotation
            const endRotationX = startRotationX + (xAxis ? 2 * Math.PI : 0);
            const endRotationY = startRotationY + (yAxis ? 2 * Math.PI : 0);

            const startTime = Date.now();

            const animateSpin = function () {
                if(!spinActiveReference.current) return;

                const elapsedTime = Date.now() - startTime;
                const progress = elapsedTime / duration;

                if(progress < 1) {
                    // Apply easing for smoother animation
                    const easedProgress = easeInOutCubic(progress);

                    // Calculate interpolated rotation
                    const newX = xAxis
                        ? startRotationX + (endRotationX - startRotationX) * easedProgress
                        : startRotationX;

                    const newY = yAxis
                        ? startRotationY + (endRotationY - startRotationY) * easedProgress
                        : startRotationY;

                    setTargetRotation({ x: newX, y: newY });
                    animationFrameReference.current = requestAnimationFrame(animateSpin);
                }
                else {
                    // Ensure we complete a full spin and return to original rotation
                    setTargetRotation({
                        x: startRotationX,
                        y: startRotationY,
                    });

                    spinActiveReference.current = false;
                }
            };

            // Cancel any existing animation frame before starting new one
            if(animationFrameReference.current) {
                cancelAnimationFrame(animationFrameReference.current);
            }

            // Start the animation
            animationFrameReference.current = requestAnimationFrame(animateSpin);

            // Return a cleanup function
            return function () {
                spinActiveReference.current = false;
                if(animationFrameReference.current) {
                    cancelAnimationFrame(animationFrameReference.current);
                }
            };
        },
        [currentRotation, groupReference, easeInOutCubic],
    );

    // Animate color change - improved to match original
    const animateColor = React.useCallback(
        function () {
            if(!sphereReference.current || !sphereReference.current.material) return;

            setAnimatingColor(true);

            // Store original color if not already stored
            if(!originalColorReference.current && sphereReference.current.material instanceof Three.MeshBasicMaterial) {
                originalColorReference.current = sphereReference.current.material.color.clone();
            }

            const startColor = originalColorReference.current?.clone() || new Three.Color(0xffffff);
            const duration = 3500; // milliseconds - matches original
            const startTime = Date.now();

            const animateColorChange = function () {
                if(!(sphereReference.current?.material instanceof Three.MeshBasicMaterial)) return;

                const elapsedTime = Date.now() - startTime;
                const progress = elapsedTime / duration;

                if(progress < 1) {
                    const newColor = new Three.Color();

                    if(progress < 0.5) {
                        // First half: animate to rainbow colors - matches original sin wave pattern
                        const r = Math.sin(progress * 2 * 2 * Math.PI) * 0.5 + 0.5;
                        const g = Math.sin((progress * 2 + 1 / 3) * 2 * Math.PI) * 0.5 + 0.5;
                        const b = Math.sin((progress * 2 + 2 / 3) * 2 * Math.PI) * 0.5 + 0.5;

                        newColor.setRGB(r, g, b);
                    }
                    else {
                        // Second half: animate back to original color
                        const returnProgress = (progress - 0.5) * 2;

                        // Calculate midpoint color (at progress = 0.5)
                        const midR = Math.sin(Math.PI) * 0.5 + 0.5;
                        const midG = Math.sin(Math.PI + (2 * Math.PI) / 3) * 0.5 + 0.5;
                        const midB = Math.sin(Math.PI + (4 * Math.PI) / 3) * 0.5 + 0.5;

                        const midColor = new Three.Color(midR, midG, midB);

                        // Interpolate from midpoint back to start color
                        newColor.r = Three.MathUtils.lerp(midColor.r, startColor.r, returnProgress);
                        newColor.g = Three.MathUtils.lerp(midColor.g, startColor.g, returnProgress);
                        newColor.b = Three.MathUtils.lerp(midColor.b, startColor.b, returnProgress);
                    }

                    // Update the sphere color directly
                    sphereReference.current.material.color.copy(newColor);

                    animationFrameReference.current = requestAnimationFrame(animateColorChange);
                }
                else {
                    // Animation complete - return to original color
                    sphereReference.current.material.color.copy(startColor);

                    originalColorReference.current = null;
                    setAnimatingColor(false);
                }
            };

            // Start the animation
            animationFrameReference.current = requestAnimationFrame(animateColorChange);
        },
        [sphereReference],
    );

    // Celebrate animation - spin + color change
    const celebrate = React.useCallback(
        function () {
            // console.log('Celebrating!');
            spin(true, true);
            animateColor();
        },
        [spin, animateColor],
    );

    // Handle double click for special animations - matches original random selection
    const handleDoubleClick = React.useCallback(
        function (event: ThreeEvent<MouseEvent>) {
            event.stopPropagation();
            event.nativeEvent.preventDefault(); // Prevent zoom behavior in some browsers

            // Random selection of effects - matches original probability distribution
            const random = Math.random();

            if(random < 0.125) {
                spin(true, false);
            }
            else if(random < 0.25) {
                spin(true, false);
                animateColor();
            }
            else if(random < 0.375) {
                spin(false, true);
            }
            else if(random < 0.5) {
                spin(false, true);
                animateColor();
            }
            else if(random < 0.625) {
                spin(true, true);
            }
            else if(random < 0.75) {
                spin(true, true);
                animateColor();
            }
            else if(random < 0.875) {
                animateColor();
            }
            else {
                celebrate();
            }
        },
        [spin, animateColor, celebrate],
    );

    // Generate frame update function - improved movement interpolation
    const frameUpdate = React.useCallback(
        function () {
            if(!groupReference.current) return;

            // Smoothly interpolate current rotation towards target rotation
            const movementThreshold = 0.001;
            const lerpFactor = 0.1; // Matches original implementation

            const deltaX = (targetRotation.x - currentRotation.x) * lerpFactor;
            const deltaY = (targetRotation.y - currentRotation.y) * lerpFactor;

            // Check if we're moving significantly
            const newIsMoving = Math.abs(deltaX) > movementThreshold || Math.abs(deltaY) > movementThreshold;
            if(isMoving !== newIsMoving) {
                setIsMoving(newIsMoving);
            }

            // Update rotation
            setCurrentRotation({
                x: currentRotation.x + deltaX,
                y: currentRotation.y + deltaY,
            });

            // Apply rotation to the 3D group
            if(groupReference.current) {
                groupReference.current.rotation.x = currentRotation.x;
                groupReference.current.rotation.y = currentRotation.y;
            }
        },
        [currentRotation, targetRotation, isMoving, groupReference],
    );

    return {
        isMoving,
        isBlinking,
        lineScale,
        currentRotation,
        animatingColor,
        handleClick,
        handleDoubleClick,
        frameUpdate,
        setTargetRotationFromNormalizedCoords,
        reset,
        blink,
        spin,
        animateColor,
        celebrate,
    };
}
