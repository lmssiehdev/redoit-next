import { useHabitPageContext } from "@/app/[habit]/[slug]/context";
import { minDate, longestStreak } from "@/utils/calculateStreak";
import clsx from "clsx";
import { streakRanges } from "date-streaks";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const convertHexToRGBA = (hexCode = "", opacity = 1) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }
  // `rgba(${r},${g},${b},${opacity})`
  const rgbString = `${r},${g},${b}`;

  const highlight = {
    background: `
    linear-gradient(to right, rgba(${rgbString}, 0.3) 0%, rgba(${rgbString}, 0.4) 60%, rgba(${rgbString}, 0.4) 60%, rgba(${rgbString}, 0.6) 85%, rgba(${rgbString}, 0.8) 100%)
    `,
  };
  return highlight;
};

type RangeReturnType = ReturnType<typeof streakRanges>;

type IStreakRange = {
  start: Date;
  end: Date | null;
  duration: number;
  percentage: number;
};

function getTop5RangesPercentages(ranges: RangeReturnType): number[] {
  const totalSum = ranges.reduce((sum, range) => sum + range.duration, 0);
  const percentages = ranges.map((range) => (range.duration / totalSum) * 100);
  return percentages;
}

export default function Streaks() {
  const { completedDates, color } = useHabitPageContext();
  const mockData = ["50%", "20%", "60%", "70%"];
  const highlight = convertHexToRGBA(color);
  const [streaksArray, setStreaksArray] = useState<IStreakRange[]>([]);

  useEffect(() => {
    const ranges = streakRanges({
      dates: Object.keys(completedDates),
    });

    const sortedRanges = ranges.sort((a, b) => b.duration - a.duration);
    const top5Ranges = sortedRanges.slice(0, 5);
    const top5RangesPercentages = getTop5RangesPercentages(top5Ranges);

    const updatedRage = top5Ranges.map((item, index) => {
      return {
        ...item,
        percentage: top5RangesPercentages[index],
      };
    });

    setStreaksArray(updatedRage);
    console.log(updatedRage);
  }, [completedDates]);

  console.log("streaks has been rerendered");

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 max-w-[400px] ">
        {streaksArray.map((item, index) => (
          <div key={index} className="flex-1 w-full flex justify-center gap-2 ">
            <span className="whitespace-nowrap text-sm  flex items-center">
              {dayjs(new Date(item.start)).format("MMM DD")}
            </span>
            <div
              className={clsx(
                "highlight yellow text-center justify-center px-1 min-w-fit py-[0.1rem]"
              )}
              style={{
                width: `${item.percentage}%`,
                ...highlight,
              }}
            >
              <span className="mx-1 block">{item.duration}</span>
            </div>
            <span className="whitespace-nowrap text-sm flex items-center">
              {dayjs(new Date(item.end ? item.end : item.start)).format(
                "MMM DD"
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
