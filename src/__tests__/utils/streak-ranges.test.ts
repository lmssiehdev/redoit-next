import { type datesParam } from "@/utils/calculate-streaks";
import { streakRanges } from "@/utils/streak-ranges";
import dayjs from "dayjs";

describe("streakRanges", () => {
  test("returns an empty array when datesParam has no checked dates", () => {
    const datesParam: datesParam = {
      "2023-3-20": "skipped",
      "2023-3-19": "skipped",
      "2023-3-18": "skipped",
    };
    const result = streakRanges(datesParam);
    expect(result).toEqual([]);
  });

  test("returns a single streak range when datesParam has only one checked date", () => {
    const datesParam: datesParam = {
      "2023-3-20": "checked",
    };
    const result = streakRanges(datesParam);
    expect(result).toEqual([
      {
        start: new Date("2023-3-20"),
        end: null,
        duration: 1,
      },
    ]);
  });

  test("returns a single streak range when datesParam has consecutive checked dates", () => {
    const datesParam: datesParam = {
      "2023-3-20": "checked",
      "2023-3-19": "checked",
      "2023-3-18": "checked",
      "2023-3-17": "checked",
    };
    const result = streakRanges(datesParam);
    expect(result).toEqual([
      {
        start: new Date("2023-3-17"),
        end: new Date("2023-3-20"),
        duration: 4,
      },
    ]);
  });

  test("returns multiple streak ranges for non-consecutive checked dates", () => {
    const datesParam: datesParam = {
      "2023-3-20": "checked",
      "2023-3-19": "skipped",
      "2023-3-18": "checked",
      "2023-3-17": "checked",
      "2023-3-16": "skipped",
      "2023-3-15": "checked",
      "2023-3-14": "checked",
    };
    const result = streakRanges(datesParam);
    expect(result).toEqual([
      {
        start: new Date("2023-3-14"),
        end: new Date("2023-3-20"),
        duration: 5,
      },
    ]);
  });
});
