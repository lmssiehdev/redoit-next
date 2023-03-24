import clsx from "clsx";
import Values from "values.js";

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

export default function Day({
  status,
  color,
  onClick,
  className,
  isActiveDay,
}: DayProps) {
  const getColor = () => {
    if (!isActiveDay)
      return `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 1px,
      ${color} 2px,
      ${color} 4px
      )`;
    if (status === "checked") return color;
    else if (status === "skipped") {
      return `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 1px,
      ${color} 2px,
      ${color} 4px
      )`;
    }
    return "";
  };
  return (
    <div
      title={status}
      onClick={onClick}
      style={{
        background: getColor(),
      }}
      className={clsx(
        className,
        {
          "opacity-50 cursor-not-allowed ": !isActiveDay,
          "!border-solid":
            (status === "skipped" || status === "checked") && isActiveDay,
        },
        "border-dashed border-[1px] border-black/60 h-7 w-7 rounded-full text-white"
      )}
    >
      <span className="invisible">.</span>
    </div>
  );
}
