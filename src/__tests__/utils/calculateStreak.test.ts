import { summary, type datesParam } from "@/utils/calculateStreaks";
import dayjs from "dayjs";

const date = dayjs();

const lastDays = () => {
  const days: {
    [key: string]: string;
  } = {};
  const ARRAY_LENGTH = 7;
  Array(ARRAY_LENGTH)
    .fill(undefined)
    .forEach((item, index) => {
      const D = date.add(-index + 1, "day").format("YYYY-M-D");
      days[D] =
        index === ARRAY_LENGTH - 1
          ? "checked"
          : index < 4
          ? "checked"
          : "skipped";
    });
  console.log(days);

  return days;
};
describe("currentStreak", () => {
  test("One skipped day does not reset streak", () => {
    const dates: datesParam = {
      "2023-3-20": "checked",
      "2023-3-19": "checked",
      "2023-3-18": "skipped",
      "2023-3-17": "checked",
      "2023-3-16": "checked",
      "2023-3-15": "skipped",
      "2023-3-14": "checked",
      "2023-3-13": "checked",
      "2023-3-12": "checked",
    };
    expect(summary(dates, []).currentStreak).toBe(0);
  });

  test("One skipped day does not reset streak", () => {
    const dates: datesParam = {
      "2023-3-20": "checked",
      "2023-3-19": "checked",
      "2023-3-18": "skipped",
      "2023-3-17": "checked",
      ...lastDays(),
    };
    expect(summary(dates, []).currentStreak).toBe(5);
  });

  test("returns 0 if there are no checked dates", () => {
    const dates: datesParam = {
      "2023-3-20": "skipped",
      "2023-3-19": "skipped",
      "2023-3-18": "skipped",
    };
    expect(summary(dates, []).currentStreak).toBe(0);
  });

  test("returns 0 if there are no dates", () => {
    const dates = {};
    expect(summary(dates, []).currentStreak).toBe(0);
  });
});
