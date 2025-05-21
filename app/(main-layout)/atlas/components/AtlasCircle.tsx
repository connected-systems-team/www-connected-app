'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Three.js
import * as Three from 'three';

// Component - AtlasCircle
export interface AtlasCircleProperties {
    color: Three.Color;
    rotation: [number, number, number];
    lineWidth?: number;
    segments?: number;
    radius?: number;
    scale?: number;
    startAngle?: number; // Allow specifying where circle starts (to hide the join)
}
export function AtlasCircle(properties: AtlasCircleProperties) {
    // References
    const groupReference = React.useRef<Three.Group>(null);

    // Scaled radius for blinking animation
    const lineWidth = properties.lineWidth ?? 0.04;
    const scale = properties.scale ?? 1;
    const tubeRadius = lineWidth * scale;
    const segments = properties.segments ?? 64;

    // Create a perfect circle path
    const circlePath = React.useMemo(
        function () {
            const curve = new Three.CurvePath<Three.Vector3>();

            const segments = properties.segments ?? 64;
            const radius = properties.radius ?? 1;
            const startAngle = properties.startAngle ?? 0;

            // Create circle curve - starting from specified angle to hide join at back
            const circlePoints = [];
            for(let i = 0; i <= segments; i++) {
                const angle = startAngle + (i / segments) * Math.PI * 2;
                circlePoints.push(new Three.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
            }

            // Close the loop by adding the first point again
            if(circlePoints[0]) {
                circlePoints.push(circlePoints[0].clone());
            }

            // Create a smooth curve from the points
            for(let i = 0; i < circlePoints.length - 1; i++) {
                const lineCurve = new Three.LineCurve3(circlePoints[i], circlePoints[i + 1]);
                curve.add(lineCurve);
            }

            return curve;
        },
        [properties.radius, properties.segments, properties.startAngle],
    );

    // Render circle as a tube geometry
    return (
        <group ref={groupReference} rotation={properties.rotation}>
            <mesh>
                <tubeGeometry
                    args={[
                        circlePath,
                        segments, // Tubular segments
                        tubeRadius, // Radius
                        8, // Radial segments
                        false, // Closed
                    ]}
                />
                <meshBasicMaterial color={properties.color} toneMapped={false} />
            </mesh>
        </group>
    );
}
