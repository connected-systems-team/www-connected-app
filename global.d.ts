// Support importing of markdown (.md) files as strings
declare module '*.md';

// Support importing of code files as strings
declare module '*.code.js' {
    const content: string;
    export default content;
}
declare module '*.code.ts' {
    const content: string;
    export default content;
}
