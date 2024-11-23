**Best Practices**

-   Using `any` is bad practice.
-   Avoid importing React hooks directly from the source (e.g., `import { useState } from 'react'`). Instead, import React and use it (e.g., `import React from 'react'`).
-   Avoid adding third-party libraries unless necessary.
-   Use escaped punctuation in JSX (e.g., `<p>John's cat</p>` should be `<p>John&apos;s cat</p>`, etc.).
-   When writing new code, if multiple files need to be editted, edit files in the order that the code will be depended on, and only edit one file at a time, explain your edits, and then ask to proceed to the next file.

**Comments**

-   Comments should be preserved and updated when modifying code, not removed.
-   Document your code with frequent comments.

**TypeScript**

-   Prefer regular functions over arrow functions.

**Imports**

-   Always use this exact line with the comment when needing to mark a file as use client:

```
'use client'; // This component uses client-only features
```

-   Always prefer named imports over default imports.
-   All imports should be categorized with comments, for example, like this:

```


// Dependencies - React and Next.js
import React from 'react';
import Link from 'next/link';

// Dependencies - Main Components
import { ButtonVariants } from '@structure/source/common/buttons/ButtonVariants';
import { ButtonSizes } from '@structure/source/common/buttons/ButtonSizes';
import { Tip } from '@structure/source/common/popovers/Tip';
import { PopoverInterface } from '@structure/source/common/popovers/Popover';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { addCommas } from '@structure/source/utilities/Number';

// Dependencies - Assets
import BrokenCircleIcon from '@structure/assets/icons/animations/BrokenCircleIcon.svg';
import ChevronDownIcon from '@structure/assets/icons/interface/ChevronDownIcon.svg';

// Dependencies - Animations
import { useSpring, animated, easings, useTransition } from '@react-spring/web';
```

Other categories include API, Shared State, and more.

**React Components**

-   Always use a properties object for React components, do not destructure it, e.g.:

```
// Component - Button
export interface ButtonInterface extends React.HTMLAttributes<HTMLElement> {
    variant?: keyof typeof ButtonVariants;
    size?: keyof typeof ButtonSizes;
    disabled?: boolean;
}
export const Button = React.forwardRef<HTMLElement, ButtonInterface>(function (
    properties: ButtonInterface,
    reference: React.Ref<any>,
)
```

-   Organize the different aspects of your components, and group them together into categories using comments. For example, here are some examples of category comments:

```
// Hooks

// State

// Share State

// Effect to...

// Function to...

// Render the component
```
