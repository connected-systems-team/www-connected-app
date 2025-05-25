# ESLint Rules

## Import Rules

**no-internal-imports**: Only files within a parent folder can import from its `internal/` subfolder. Prevents: `import { Button } from '@project/components/internal/Button'` or `'../../components/buttons/internal/Button'`

**no-structure-project-imports**: Structure library can't use `@project` imports except: `ProjectSettings`, `source/theme/styles/theme.css`, `tailwind.config`

## React Rules

**react-no-destructuring-properties**: No destructuring in component parameters.

```tsx
// ❌ function Button({ color, text }) {...}
// ✅ function Button(properties) { return <button style={{color: properties.color}}>... }
```

**react-no-destructuring-import**: No destructuring React imports.

```tsx
// ❌ import React, { useState } from 'react'; const [state, setState] = useState();
// ✅ import React from 'react'; const [state, setState] = React.useState();
```

**react-properties-parameter-name**: Use 'properties' not 'props'.

```tsx
// ❌ function Button(props) {...}; interface ButtonProps {...}
// ✅ function Button(properties) {...}; interface ButtonProperties {...}
```

**react-no-arrow-functions-as-hook-parameters**: Use regular functions with hooks.

```tsx
// ❌ React.forwardRef((props, ref) => {...}); element.addEventListener('click', () => {...})
// ✅ React.forwardRef(function(properties, ref) {...}); element.addEventListener('click', function() {...})
```

**react-properties-type-naming**: Type names must end with "Properties".

```tsx
// ❌ interface ButtonProps {...}; function Button(properties: ButtonProps) {...}
// ✅ interface ButtonProperties {...}; function Button(properties: ButtonProperties) {...}
```

**react-function-style**: Use function declarations for components.

```tsx
// ❌ export const Button = function(properties) {...}; export const Card = (properties) => {...}
// ✅ export function Button(properties) {...}
```

**react-export-rules**: Named exports for components, default exports for pages.

```tsx
// ❌ export default function Button(properties) {...}
// ❌ export function Page(properties) {...} // in page.tsx
// ✅ export function Button(properties) {...}
// ✅ export default function Page(properties) {...} // in page.tsx
```

## Best Practices

-   Use relative imports within modules, aliased imports (`@project/...`) across modules
-   Don't import from `internal/` outside parent folder
-   Keep structure library self-contained
-   Use `properties` not `props`
-   No destructuring of React imports or component properties
-   Use function declarations for components
-   Use named exports for components, default exports for Next.js pages
-   Component property type names end with `Properties`

-   **Unused Variables**: Always remove or comment out unused variables; the linter will flag them
-   **Variable Naming**: Use camelCase for variables, functions, and properties
-   **TypeScript**: Required for all new code; avoid using `any` type
-   **State Management**: Use React's built-in state management where appropriate
-   **Property Naming**: Use complete descriptive names like `minimum`/`maximum` instead of abbreviated `min`/`max`
-   **Function Style**: Prefer regular functions over arrow functions:

    ```typescript
    // Use this:
    element.addEventListener('click', function () {
        // Function body
    });

    array.forEach(function (item) {
        // Function body
    });

    // Don't use this:
    element.addEventListener('click', () => {
        // Function body
    });

    array.forEach((item) => {
        // Function body
    });
    ```

-   **Properties**: Always use a properties object for React components, never destructure properties. Always access properties directly using `properties.propertyName` syntax. For default values, use inline conditionals rather than destructuring with defaults:

    ```typescript
    // Use this:
    export function MyComponent(properties: MyComponentProperties) {
        // Direct property access with inline defaults
        return (
            <div className={properties.className || ''}>
                {properties.title}
                <button
                    onClick={properties.onButtonClick}
                    disabled={properties.isDisabled !== undefined ? properties.isDisabled : false}
                    style={properties.buttonStyle || { color: 'blue' }}
                >
                    {properties.buttonText || 'Default Text'}
                </button>
            </div>
        );
    }

    // Don't use this with destructuring:
    export function MyComponent(properties: MyComponentProperties) {
        // No destructuring - AVOID THIS
        const {
            className = '',
            title,
            onButtonClick,
            isDisabled = false,
            buttonText = 'Default Text',
            buttonStyle = { color: 'blue' }
        } = properties;

        return (
            <div className={className}>
                {title}
                <button onClick={onButtonClick} disabled={isDisabled} style={buttonStyle}>
                    {buttonText}
                </button>
            </div>
        );
    }

    // Also avoid creating local variables for property values:
    export function MyComponent(properties: MyComponentInterface) {
        // No local variables for properties - AVOID THIS
        const className = properties.className || '';
        const isDisabled = properties.isDisabled !== undefined ? properties.isDisabled : false;
        const buttonText = properties.buttonText || 'Default Text';

        return (
            <div className={className}>
                {properties.title}
                <button onClick={properties.onButtonClick} disabled={isDisabled}>
                    {buttonText}
                </button>
            </div>
        );
    }
    ```

-   **Reference Naming**: Always use the full word `Reference` instead of abbreviated `Ref` when naming React refs:

    ```typescript
    // Use this:
    const buttonReference = React.useRef<HTMLButtonElement>(null);
    const inputReference = React.useRef<HTMLInputElement>(null);

    // Don't use this:
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    ```

### React Components

-   **Component Structure**: Use functional components with hooks
-   **Component Organization**: Use comments to separate component sections:
    ```
    // Hooks
    // State
    // Shared State
    // Effects
    // Functions
    // Render the component
    ```
-   **Client Components**: Always use this exact line when marking a file as client component:
    ```
    'use client'; // This component uses client-only features
    ```
-   **Hooks**: Always use this exact line when marking a file as a client hook:
    ```
    'use client'; // This hook uses client-only features
    ```
-   **React Hooks**: Always access React hooks with the React prefix:

    ```typescript
    // Use this:
    const [state, setState] = React.useState(initialState);
    const callback = React.useCallback(() => {}, []);
    const ref = React.useRef(null);

    // Don't use this:
    const [state, setState] = useState(initialState);
    const callback = useCallback(() => {}, []);
    const ref = useRef(null);
    ```

### Imports

-   Always import React as a default import without destructuring hooks
-   Always access React hooks with the React prefix (`React.useState`, etc.)
-   Always use named imports over default imports for other libraries when possible
-   Group imports by category with comments:

    ```
    // Dependencies - React
    import React from 'react';

    // Dependencies - Next.js
    import { useRouter } from 'next/router';

    // Dependencies - Main Components
    import { Button } from '@structure/source/common/buttons/Button';

    // Dependencies - Utilities
    import { mergeClassNames } from '@structure/source/utilities/Style';

    // Dependencies - Assets
    import UserIcon from '@structure/assets/icons/people/UserIcon.svg';

    // Dependencies - API
    import { useQuery, useMutation } from '@apollo/client';
    ```

### CSS & Styling

-   Use Tailwind CSS utility classes for styling
-   Keep the order of Tailwind classes consistent and grouped by type

## Component Interfaces

Use concise interface definitions for TypeScript interfaces:

```typescript
// Component - ComponentName
export interface ComponentNameInterface {
    className?: string;
    minimumWidth?: number; // Use descriptive names (not minWidth)
    maximumHeight?: number; // Use descriptive names (not maxHeight)
    isDisabled?: boolean;
    withCredentials?: boolean; // Include short inline comments for clarity when needed
    onButtonClick?: () => void;
}

export function ComponentName(properties: ComponentNameInterface) {
    // Component implementation
}
```

Avoid multi-line comments for each property in interfaces. Instead, use descriptive property names that are self-explanatory. Add brief inline comments only when additional clarity is needed.

## Project Architecture

### File Organization

-   Components should be placed in the appropriate directories:
    -   Common components: `/libraries/structure/source/common/`
    -   Module-specific components: `/libraries/structure/source/modules/[module]/`
    -   Pages and routes: `/app/`

## Documentation & Comments

-   Comments should be preserved and updated when modifying code
-   Document your code with frequent comments
-   Use JSDoc style comments for functions and components
-   Write descriptive comments for complex logic

## Best Practices

-   Avoid adding third-party libraries unless necessary
-   Use escaped punctuation in JSX (e.g., `John&apos;s` not `John's`)
-   Implement proper error handling for all async operations
-   Ensure responsive design for all UI components
-   Follow accessibility best practices
-   Run code quality tools before committing:

    ```bash
    # Check linting and types (recommended during development)
    npm run compile
    ```

## Common Commands

### Building & Development

```bash
# Start development server
npm run dev

# Check linting and types (won't break dev server)
npm run compile

# Full build with Next.js compilation (use when ready to deploy)
npm run build
```

-   **IMPORTANT**: Use `npm run compile` for quick type checking during development. Only use `npm run build` when you need a full production build, as it will break your running dev server.

### GraphQL

```bash
# Generate GraphQL types
npm run graphql:generate
```

## Module Structure

The project is organized into the following main modules:

-   `account`: User accounts, authentication, profiles
-   `common`: Shared UI components and utilities
-   `modules`: Domain-specific functionality

Use the established utility functions whenever possible:

-   `mergeClassNames`: For combining Tailwind classes

This document will be updated as the project evolves and new patterns or requirements emerge.
