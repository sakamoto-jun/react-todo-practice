import { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import TodoInput from "./TodoInput";

const meta = {
  title: "todo/TodoInput",
  component: TodoInput,
  args: {
    onAddTodo: fn(),
  },
} satisfies Meta<typeof TodoInput>;

export default meta;
type Story = StoryObj<typeof TodoInput>;

export const Default: Story = {
  args: {},
};
