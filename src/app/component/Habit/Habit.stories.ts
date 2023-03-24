import type { Meta, StoryObj } from "@storybook/react";
import Habit from "./Habit";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Habit> = {
  title: "Habit",
  component: Habit,
  tags: ["autodocs"],
  argTypes: {
    status: "unchecked",
  },
};

export default meta;
type Story = StoryObj<typeof Habit>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {};
