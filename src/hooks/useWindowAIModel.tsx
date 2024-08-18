import { useRef, useState, useEffect } from "react";

export const useWindowAIModel = () => {
  const aiRef = useRef<Window["ai"]>(window.ai);
  const [model, setModel] = useState<any>();

  useEffect(() => {
    if (!aiRef.current) {
      throw new Error(
        "The window.ai model is not available. Your browser may not support Chrome's window.ai API."
      );
    }

    const intializeSessions = async () => {
      const aiSession = await aiRef.current.createTextSession();
      setModel(aiSession);
    };

    intializeSessions();
  }, []);

  return model;
};
