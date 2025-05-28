'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { Atlas } from '@project/app/(main-layout)/atlas/_components/Atlas';
import { Button } from '@structure/source/common/buttons/Button';

// Component - AtlasPage
export function AtlasPage() {
    // console.log(` `);
    // console.log(`             :-=*##%@@@@@#= :#*+=-:               `);
    // console.log(`        .=*%@@@@@@@@@@@@@@@# .@@@@@@%*=.          `);
    // console.log(`     :+%@@@@@@@@@@@@@@@@@@@@+ :@@@@@@@@@%+.       `);
    // console.log(`   -%@@@@@@@@@@@@@@@@@@@@@@@@. #@@@@@@@@@@@#-     `);
    // console.log(` :%@@@@@@@@@@@@@@@@@@@@@@@@@@+ -@@@@@@@@@@@@@%:   `);
    // console.log(`-@@@@@@@@@@@@@@@@@@@@@@@@@@@@%  @@@@@@@@@@@@@@@-  `);
    // console.log(`:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  %@@@@@@@@@@@@@@@:`);
    // console.log(`%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: #@@@@@@@@@@@@@@@%`);
    // console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@: *@@@@@@@@@@@@@@@@`);
    // console.log(`-+#%@@@@@@@@@@@@@@@@@@@@@@@@@@: #@@@@@@@@@@@%#+-  `);
    // console.log(`:%*+=-::::--===+++*************  =+===--::::-=+*%:`);
    // console.log(`=@@@@@@@@@@%%####************+  ###%%@@@@@@@@@@=  `);
    // console.log(` :%@@@@@@@@@@@@@@@@@@@@@@@@@@* :@@@@@@@@@@@@@%:   `);
    // console.log(`   =%@@@@@@@@@@@@@@@@@@@@@@@@: *@@@@@@@@@@@%=     `);
    // console.log(`     :*@@@@@@@@@@@@@@@@@@@@@* :@@@@@@@@@@*:       `);
    // console.log(`        :=#@@@@@@@@@@@@@@@@# .%@@@@@@#=:          `);
    // console.log(`            .:=+*#%@@@@@@%= :##*+=:.              `);
    // console.log(` `);
    // console.log('Salutations fellow engineer. Follow us on Twitter: https://twitter.com/connecteddotapp');

    // State to control whether particles are enabled
    const [particlesEnabled, setParticlesEnabled] = React.useState(true);

    // Toggle particles on/off
    const toggleParticles = React.useCallback(function () {
        setParticlesEnabled((previousParticlesEnabled) => !previousParticlesEnabled);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="w-full">
                <Atlas
                    particlesEnabled={particlesEnabled}
                    className="relative w-full"
                    style={{
                        minHeight: '75vh',
                        maxHeight: '90vh',
                    }}
                    scale={0.25}
                />
            </div>

            <div className="mb-8 mt-4">
                <Button className="rounded-md px-4 py-2 text-white transition-colors" onClick={toggleParticles}>
                    {particlesEnabled ? 'Disable Particles' : 'Enable Particles'}
                </Button>
            </div>
        </div>
    );
}
