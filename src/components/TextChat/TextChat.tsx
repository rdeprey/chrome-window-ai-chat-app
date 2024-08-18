import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWindowAIModel } from "../../hooks/useWindowAIModel";
import styles from "./TextChat.module.css";

interface FormElements extends HTMLFormControlsCollection {
  promptInput: HTMLInputElement;
}

interface PromptInputFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const TextChat = () => {
  const model = useWindowAIModel();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userText, setUserText] = useState<string>("");
  const [conversation, setConversation] = useState<
    { type: string; message: string; id: string }[]
  >([]);

  const handleInput = async (
    event: React.FormEvent<PromptInputFormElement>
  ) => {
    event.preventDefault();

    if (!model) {
      console.error("Model not loaded");
      return;
    }

    // Reset the textarea field
    setUserText("");

    // Add the user's message to the conversation
    // shown in the chat window
    setConversation([
      ...conversation,
      {
        type: "user",
        message: event.currentTarget.promptInput.value,
        id: uuidv4(),
      },
    ]);

    // Get the model's response
    const modelResponse = await model.prompt(
      event.currentTarget.promptInput.value
    );

    if (!modelResponse) {
      console.error("The model did not respond");
      return;
    }

    // Add the model's response to the conversation
    // with a slight delay to simulate the model "thinking"
    setTimeout(async () => {
      setConversation((prev) => [
        ...prev,
        {
          type: "model",
          message: modelResponse,
          id: uuidv4(),
        },
      ]);
    }, 500);

    // Restore focus to the textarea
    textAreaRef.current?.focus();
  };

  useEffect(() => {
    // Scroll to bottom of chat container
    // when a new message is added
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation]);

  return (
    <div className={styles.wrapper}>
      <h2>Chat with AI</h2>
      <div ref={chatContainerRef} className={styles.chatContainer}>
        {conversation.map((convo) => (
          <p key={convo.id} data-type={convo.type}>
            {convo.message}
          </p>
        ))}
      </div>
      <form onSubmit={handleInput} className={styles.form}>
        <textarea
          ref={textAreaRef}
          rows={5}
          cols={50}
          id="promptInput"
          value={userText}
          onChange={(event) => setUserText(event.currentTarget.value)}
        />
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};
