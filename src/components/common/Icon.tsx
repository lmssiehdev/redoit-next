import { w } from "windstitch";

export const ClickableIconWrapper = w.button(
  `rounded-full cursor-pointer enabled:hover:bg-violet-300/10 cursor-pointer text-inherit disabled:cursor-not-allowed disabled:text-violet-300 `
);

const Icon = w.span(``, {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export default Icon;
