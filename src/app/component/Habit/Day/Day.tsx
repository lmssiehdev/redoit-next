import clsx from "clsx";
import { W, w } from "windstitch";
import { Scrible } from "@/app/component/Icons";
import { memo, useMemo } from "react";

interface DayProps {
  status: "checked" | "skipped";
  color: string;
  className?: string;
  onClick?: () => void;
  isActiveDay: boolean;
  size?: "md" | "lg" | "full";
}

const DayEle = w.div(
  "border-dashed border-[1px] border-black/60 text-white aspect-square ",
  {
    variants: {
      shape: {
        rounded: "rounded-full",
        square: "",
      },
      sise: {
        md: "h-7 w-7",
        lg: "h-9 w-9",
        full: "h-full w-full",
      },
      checked: (yes: boolean, color: string) => (yes ? "amazing" : color),
      isActiveDay: (yes: boolean) =>
        yes ? "!border-solid" : "opacity-50 cursor-not-allowed",
    },
    defaultVariants: {
      shape: undefined,
      size: "md",
    },
  }
);

function Day({
  status,
  color,
  onClick,
  className,
  isActiveDay,
  // TODO: Refactor me
  size,
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

  const direction = useMemo(
    () => (Math.random() < 0.5 ? "-45deg" : "45deg"),
    []
  );

  const handleOnClick = () => {
    if (!isActiveDay) return;
    onClick && onClick();
    return;
  };
  return (
    <DayEle
      title={status}
      onClick={handleOnClick}
      style={{
        background: status === "checked" ? color : "",
        color: color,
      }}
      sise={size ?? "lg"}
      checked={true}
      isActiveDay={isActiveDay}
      shape="rounded"
      className={clsx(className, "overflow-hidden ")}
    >
      {status === "skipped" && (
        <Scrible
          className="scale-[2.4]"
          style={{
            fill: color,
            rotate: direction,
          }}
        />
      )}
      {/* <span className="invisible">.</span> */}
    </DayEle>
  );
}
export default memo(Day);
