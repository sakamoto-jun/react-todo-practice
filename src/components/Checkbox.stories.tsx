import { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import Checkbox from "./Checkbox";

const meta = {
  title: "common/Checkbox",
  component: Checkbox,
  args: {
    checked: false,
    label: "Checkbox Label",
    onChange: fn(),
  },
  argTypes: {
    checked: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    id: "checkbox",
    label: "Checkbox",
    checked: false,
  },
};
export const LongLabel: Story = {
  args: {
    id: "checkbox-long-label",
    label:
      "This is a checkbox with a very long label to test text wrapping and layout.",
    checked: false,
  },
};
