import clsx from "clsx";
import Values from "values.js";
import { w } from "windstitch";

interface DayProps {
  /**
   * Is this the principal call to action on the page?
   */
  status: "checked" | "unchecked" | "skipped";
  /**
   * Habit color
   */
  color: string;
  /**
   * Optional click handler
   */
  className?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;
  isActiveDay: boolean;
}

const Div = w.div("border-dashed border-[1px] border-black/60 text-white", {
  variants: {
    shape: {
      rounded: "rounded-full",
    },
    sise: {
      md: "h-7 w-7",
      lg: "h-9 w-9",
    },
    checked: (yes: boolean, color: string) => (yes ? "amazing" : color),
    isActiveDay: (yes: boolean) =>
      yes ? "!border-solid" : "opacity-50 cursor-not-allowed",
  },
  defaultVariants: {
    shape: "rounded",
    size: "md",
  },
});

export default function Day({
  status,
  color,
  onClick,
  className,
  isActiveDay,
}: DayProps) {
  const getColor = () => {
    if (!isActiveDay || status === "skipped")
      return `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 1px,
      ${color} 2px,
      ${color} 4px
      )`;

    if (status === "checked") return color;
    return "";
  };

  // const isActiveDayC =e
  //   isActiveDay && (status === "skipped" || status === "chcked");

  const handleOnClick = () => {
    if (!isActiveDay) return;
    onClick && onClick();
    return;
  };
  return (
    <Div
      title={status}
      onClick={handleOnClick}
      style={{
        background: getColor(),
      }}
      shape="rounded"
      sise="lg"
      checked={true}
      isActiveDay={isActiveDay}
      className={clsx(className)}
    >
      <span className="invisible">.</span>
    </Div>
  );
}
