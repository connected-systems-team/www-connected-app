# ESLint Rules

## Import Rules

**no-internal-imports-rule**: Only files within a parent folder can import from its `internal/` subfolder. Prevents: `import { Button } from '@project/components/internal/Button'` or `'../../components/buttons/internal/Button'`

**no-structure-project-imports-rule**: Structure library can't use `@project` imports except: `@project/ProjectSettings`, `@project/app/_theme/styles/theme.css`, `@project/tailwind.config`

**react-import-rule**: Use `@structure/source/router/Navigation` instead of `next/navigation` for framework-independent navigation.

```tsx
// ❌ import { useRouter } from 'next/navigation';
// ✅ import { useRouter } from '@structure/source/router/Navigation';
```

## React Rules

**react-destructuring-properties-rule**: Destructuring in component parameters is only allowed when spreading remaining properties to another element. Spread variables must end with 'Properties' and be semantically named.

```tsx
// ❌ No destructuring without spreading
function Button({ color, text }) {...}

// ❌ Generic spread names
function Button({ color, ...props }) {...}
function Button({ color, ...rest }) {...}

// ✅ No destructuring when not needed
function Button(properties) { return <button style={{color: properties.color}}>... }

// ✅ Destructuring with semantic spread names ending in 'Properties'
function Button({ className, onClick, children, ...buttonProperties }) {
    return <button className={className} onClick={onClick} {...buttonProperties}>{children}</button>
}
```

**react-no-destructuring-react-rule**: No destructuring React imports.

```tsx
// ❌ import React, { useState } from 'react'; const [state, setState] = useState();
// ✅ import React from 'react'; const [state, setState] = React.useState();
```

**react-naming-conventions-rule**: Ban "prop"/"props"/"param"/"params" or ending in "Prop"/"Props"/"Param"/"Params". Exception: `params`/`searchParams` are allowed in Next.js page files and files with Next.js APIs.

```tsx
// ❌ function Button(props) {...}; interface ButtonProps {...}
// ❌ const param = getValue(); const userParams = getConfig();
// ❌ const prop = 'value'; const params = [1, 2, 3];
// ✅ function Button(properties) {...}; interface ButtonProperties {...}
// ✅ const parameter = getValue(); const userParameters = getConfiguration();
// ✅ const property = 'value'; const parameters = [1, 2, 3];
```

**react-no-arrow-functions-as-hook-parameters-rule**: Use regular functions with React hooks and event listeners.

```tsx
// ❌ React.forwardRef((props, ref) => {...}); element.addEventListener('click', () => {...})
// ✅ React.forwardRef(function(properties, ref) {...}); element.addEventListener('click', function() {...})
```

**react-function-style-rule**: Use function declarations for components.

```tsx
// ❌ export const Button = function(properties) {...}; export const Card = (properties) => {...}
// ✅ export function Button(properties) {...}
```

**react-export-rule**: Named exports for components, default exports for pages.

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

-   **Properties**: Use direct property access (`properties.propertyName`) for React components. Only destructure when you need to spread remaining properties to another element, using semantic naming that ends with 'Properties':

    ```typescript
    // Use this for simple components (no spreading needed):
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

    // Use this when spreading remaining properties:
    export function MyButton({ className, onClick, children, ...buttonProperties }: MyButtonProperties) {
        return (
            <button
                className={className}
                onClick={onClick}
                {...buttonProperties}
            >
                {children}
            </button>
        );
    }

    // Don't use destructuring without spreading:
    export function MyComponent({ title, className, onClick }: MyComponentProperties) {
        // AVOID THIS - no spreading, so use properties.title instead
        return <div className={className} onClick={onClick}>{title}</div>;
    }

    // Don't use generic spread names:
    export function MyButton({ className, ...props }: MyButtonProperties) {
        // AVOID THIS - use 'buttonProperties' instead of 'props'
        return <button className={className} {...props} />;
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
    // Dependencies - React and Next.js
    import React from 'react';
    import { useRouter } from 'next/router';

    // Dependencies - Main Components
    import { Button } from '@structure/source/common/buttons/Button';

    // Dependencies - API
    import { useQuery, useMutation } from '@apollo/client';

    // Dependencies - Assets
    import UserIcon from '@structure/assets/icons/people/UserIcon.svg';

    // Dependencies - Utilities
    import { mergeClassNames } from '@structure/source/utilities/Style';
    ```

### CSS and Styling

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

## Documentation and Comments

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

### Building and Development

```bash
# Start development server
npm run dev

# Check linting only
npm run lint

# Check linting and types (won't break dev server)
npm run compile

# Full build with Next.js compilation (use when ready to deploy, will break active dev server)
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
