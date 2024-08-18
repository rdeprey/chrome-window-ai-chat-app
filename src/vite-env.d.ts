/// <reference types="vite/client" />
interface Window {
  // TODO: Eventually remove this when type is added to TS?
  ai: {
    createTextSession: () => Promise<any>;
    createGenericSession: () => Promise<any>;
  };
}
