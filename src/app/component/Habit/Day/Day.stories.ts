import type { Meta, StoryObj } from "@storybook/react";
import Day from "./Day";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Day> = {
  title: "Example/Day",
  component: Day,
  tags: ["autodocs"],
  argTypes: {
    status: "unchecked",
  },
};

export default meta;
type Story = StoryObj<typeof Day>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    status: "unchecked",
  },
};

export const Checked: Story = {
  args: {
    status: "checked",
  },
};

export const Skipped: Story = {
  args: {
    status: "skipped",
  },
};
