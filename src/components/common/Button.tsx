"use client";
import { w } from "windstitch";

const Button = w.button(
  "inline border-[1.5px] rounded-[0_0_125px_3px/3px_85px_5px_55px] transition-all ease-in cursor-pointer hover:bg-opacity-50 relative",
  {
    variants: {
      color: {
        red: "text-red-700 bg-red-200",
        blue: "text-blue-700 bg-blue-200",
        green: "text-green-700 bg-green-200",
      },
      mode: {
        primary: "border-solid border-[#37353f] shadow-[3px_3px_0_0_#37353f]",
        secondary:
          "border-solid border-[#37353f] shadow-[4px_4px_0_0] shadow-red-600/50 ",
        defaultMode:
          " bg-transparent border-solid border-[#37353f] after:absolute after:h-full after:w-full after:top-0 after:left-0 after:bg-yellow-500/30 after:translate-x-2 after:translate-y-2 after:hover:translate-x-0 after:hover:translate-y-0 after:transition-all after:z-[-1]",
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-md px-4 py-2",
        lg: "text-lg",
      },
      weight: {
        bold: "font-bold",
        normal: "font-normal",
      },
    },
    defaultVariants: {
      weight: "normal",
      size: "md",
      mode: undefined,
    },
  }
);

export default Button;
