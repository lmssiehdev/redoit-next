import { useHabitPageContext } from "@/app/[habit]/[slug]/page";
import { minDate, longestStreak } from "@/utils/calculateStreak";
import clsx from "clsx";

const convertHexToRGBA = (hexCode, opacity = 1) => {
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

export default function Streaks() {
  const habit = useHabitPageContext();
  const mockData = ["50%", "20%", "60%", "70%"];
  const highlight = convertHexToRGBA(habit.color);

  return (
    <>
      {JSON.stringify(habit.completedDates)}
      <div>{JSON.stringify(longestStreak(habit.completedDates))}</div>

      {/* {currentStreak(habit.completedDates).map((item, index) => (
        <div key={index}>
          {JSON.stringify(item.starting_date)}
          <span>{item.streak}</span>
          {JSON.stringify(item.end_date)}
        </div>
      ))} */}
      <div className="flex flex-col items-center gap-1">
        {mockData.map((percentage, index) => (
          <span
            key={index}
            className={clsx("highlight yellow text-center max-w-[400px]")}
            style={{
              width: percentage,
              ...highlight,
            }}
          >
            {percentage}
          </span>
        ))}
      </div>
    </>
  );
}
