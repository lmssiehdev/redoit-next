import { styled } from "react-tailwind-variants";

export const ClickableIconWrapper = styled("button", {
  base: `rounded-full cursor-pointer enabled:hover:bg-violet-300/10 cursor-pointer text-inherit disabled:cursor-not-allowed disabled:text-slate-700/50`,
});

const Icon = styled("span", {
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
