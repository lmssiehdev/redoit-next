import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import { Habit } from "@/types/habit-types";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);

type asDate = Date | string;
export type datesParam =
  | asDate[]
  | {
      [date: string]: Habit.Status;
    };

function differenceInDays(later: asDate, earlier: asDate) {
  const date = dayjs(later);
  return date.diff(earlier, "day");
}

export function sortDates(dates: asDate[]) {
  return dates.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
}

function isTomorrowSkipped(
  later: asDate,
  earlier: asDate,
  disabledWeeks: boolean[]
) {
  const date = dayjs(earlier);
  const laterDate = dayjs(later);

  for (let i = 0; i < disabledWeeks.length; i++) {
    const nextDay = date.add(i + 1, "day");
    if (disabledWeeks[nextDay.day()] && nextDay !== laterDate) return true;
  }

  return false;
}

const today = dayjs();

export function isObject(stuff: unknown) {
  return stuff instanceof Object && Array.isArray(stuff) && stuff != null;
}

export const getDatesParameter = (dates: datesParam) => {
  if (Array.isArray(dates)) return dates;
  else if (dates instanceof Object)
    return Object.entries(dates).map(([key]) => key);
};

function summary(datesParam: datesParam, disabledWeeks: boolean[]) {
  console.time("summary");
  const dates = getDatesParameter(datesParam);

  if (!dates) throw new Error("please provide valid dates!!!");

  const sortedDates = sortDates(dates);

  const result = sortedDates.reduce(
    (acc, date, index) => {
      const formatedDate = dayjs(date).format("YYYY-M-D");
      const dayOfWeek = dayjs(formatedDate).day();

      // @ts-ignored
      const checked = datesParam[formatedDate] === "checked";

      const first = new Date(date);
      const second = sortedDates[index + 1]
        ? new Date(sortedDates[index + 1])
        : first;
      const diff = differenceInDays(second, first);

      const isToday = acc.isToday || dayjs(date).isToday();
      const isYesterday = acc.isYesterday || dayjs(date).isYesterday();
      const isInFuture = acc.isInFuture || dayjs(date).isAfter(today);

      if (diff === 0) {
        if (isToday) {
          acc.todayInStreak = true;
        }
      } else {
        diff === 1 || disabledWeeks[dayjs(date).add(1, "day").day()] === false
          ? checked && ++acc.streaks[acc.streaks.length - 1]
          : acc.streaks.push(1);
      }

      return {
        ...acc,
        longestStreak: Math.max(...acc.streaks),
        withinCurrentStreak:
          acc.isToday ||
          acc.isYesterday ||
          acc.isInFuture ||
          isToday ||
          isYesterday ||
          isInFuture,
        currentStreak:
          isToday || isYesterday || isInFuture
            ? acc.streaks[acc.streaks.length - 1]
            : 0,
        isInFuture,
        isYesterday,
        isToday,
      };
    },
    {
      currentStreak: 0,
      longestStreak: 0,
      streaks: [1],
      todayInStreak: false,
      withinCurrentStreak: false,
      isInFuture: false,
      isToday: false,
      isYesterday: false,
    }
  );

  const { isToday, isYesterday, isInFuture, ...rest } = result;

  console.timeEnd("summary");
  return rest;
}

const t = {
  "2023-5-19": "checked",
  "2023-5-22": "checked",
  "2023-5-23": "checked",
  "2023-5-21": "skipped",
  "2023-5-20": "checked",
  "2023-5-18": "checked",
  "2023-5-17": "skipped",
};

export { summary };
