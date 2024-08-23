import { useRef, useState, useEffect } from "react";

export const useWindowAIModel = () => {
  const model = useRef<Window["ai"]>(window.ai);
  const [modelSession, setModelSession] = useState<any>();

  useEffect(() => {
    if (!model.current) {
      throw new Error(
        "The window.ai model is not available. Your browser may not support Chrome's window.ai API."
      );
    }

    const intializeSessions = async () => {
      const aiSession = await model.current.assistant.create();
      setModelSession(aiSession);
    };

    intializeSessions();

    () => {
      modelSession?.destroy();
    };
  }, []);

  return modelSession;
};
