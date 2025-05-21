I LOVE WHEN CLAUDE USES EMOJIS WHEN TALKING TO ME! 😜

# Connected App - Claude Coding Guidelines

This document provides guidelines and preferences for Claude when assisting with the Connected App project. It helps maintain consistency and follows the project's established patterns.

## Code Style & Formatting

### TypeScript/JavaScript

-   **Variable Naming**: Use camelCase for variables, functions, and properties
-   **TypeScript**: Required for all new code; avoid using `any` type
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
    export function MyComponent(properties: MyComponentInterface) {
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
    export function MyComponent(properties: MyComponentInterface) {
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

-   **State Management**: Use React's built-in state management where appropriate
-   **Property Naming**: Use complete descriptive names like `minimum`/`maximum` instead of abbreviated `min`/`max`
-   **Reference Naming**: Always use the full word `Reference` instead of abbreviated `Ref` when naming React refs:

    ```typescript
    // Use this:
    const buttonReference = React.useRef<HTMLButtonElement>(null);
    const inputReference = React.useRef<HTMLInputElement>(null);

    // Don't use this:
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    ```

-   **Unused Variables**: Always remove unused variables; the linter will flag them

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
-   Follow the dark mode pattern with dark: prefixes for dark mode variations
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

For complex interfaces where documentation is necessary, consider using JSDoc above the interface:

```typescript
/**
 * Interface for the ImageUploader component
 * @property uploadUrl - The endpoint to send the upload request to
 * @property maxFileSize - Maximum file size in bytes (default: 10MB)
 * @property variant - The visual style of the uploader
 */
export interface ImageUploaderInterface {
    uploadUrl: string;
    maximumFileSize?: number;
    variant?: 'Button' | 'DropZone' | 'Simple';
    // additional properties...
}
```

## Project Architecture

### File Organization

-   Components should be placed in the appropriate directories:
    -   Common components: `/libraries/structure/source/common/`
    -   Module-specific components: `/libraries/structure/source/modules/[module]/`
    -   Pages: `/app/`

### API & Data Fetching

-   Use GraphQL for API requests
-   Define GraphQL documents in `.graphql` files
-   Prefer Apollo Client hooks for data fetching
-   Keep GraphQL queries and mutations organized

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
    # Check for type errors
    npm run typecheck

    # Run linting
    npm run lint
    ```

## Common Commands

### Building & Development

```bash
# Start development server
npm run dev

# Build the project (includes typechecking)
npm run build
```

-   IMPORTANT: Use `npm run build` (not `npm run typecheck`) whenever checking types.

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

## UI Component Guidelines

### Forms

-   Use FormInput components for form fields
-   Implement proper validation and error states

### Dialogs & Modals

-   Use the Dialog component for modal dialogs
-   Ensure proper focus management and accessibility

### Images

-   Use the new image processing utilities for image manipulation
-   Implement proper loading states and error handling for images

### Responsive Design

-   Design for mobile-first, then adapt for larger screens
-   Use Tailwind's responsive prefixes (sm:, md:, lg:, etc.)

## State Management

-   Use React's useState and useEffect for component-level state
-   Use context for sharing state between components when appropriate
-   Avoid prop drilling by using context or state management libraries

## Utility Functions

Use the established utility functions whenever possible:

-   `mergeClassNames`: For combining Tailwind classes
-   `createImagePreview`/`revokeImagePreview`: For image preview management
-   `cropImage`/`resizeImage`: For image processing

---

This document will be updated as the project evolves and new patterns or requirements emerge.
