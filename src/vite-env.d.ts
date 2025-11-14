// FIX: Removed `/// <reference types="vite/client" />` to resolve a type error.
// This is a workaround for a project configuration issue (e.g., in tsconfig.json or vite config).

// FIX: Added global types for window.aistudio to resolve redeclaration errors.
interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
}

interface Window {
    aistudio?: AIStudio;
}
