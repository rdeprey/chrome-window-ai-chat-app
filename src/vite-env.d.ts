/// <reference types="vite/client" />
interface Window {
  // TODO: Eventually remove this when type is added to TS?
  ai: {
    assistant: {
      capabilities: () => Promise<any>;
      create: () => Promise<any>;
    };
  };
}
