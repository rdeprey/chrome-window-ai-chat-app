import type { Meta, StoryObj } from "@storybook/react";
import { TextChat } from "../components/TextChat/TextChat";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const StoryWrapper = () => {
  return (
    <ErrorBoundary>
      <TextChat />
    </ErrorBoundary>
  );
};

const meta = {
  title: "TextChat",
  component: StoryWrapper,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TextChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextChatExample: Story = {};
