import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";
import clsx from "clsx";
import { days } from "@/constants";

export const FrequencySelector = ({
  updateFrequency,
  frequency,
}: {
  frequency: boolean[];
  updateFrequency: (value: boolean[]) => void;
}) => {
  // TODO: rewrite this mess, I'm sure there is a better way to do this.

  const arrToBoolean = (value: string[]) => {
    return Array(7)
      .fill(true)
      .map((_, index) => {
        if (value.includes(days[index].substring(0, 2))) return true;
        else return false;
      });
  };

  const BooleanToString = (value: boolean[]): string[] => {
    return value.map((item, index) => {
      if (item) return days[index].substring(0, 2);
      else return "";
    });
  };

  const handleFrequencyChange = (v: string[]) => {
    const frequency = arrToBoolean(v);
    console.log(v, frequency);
    updateFrequency(frequency);
  };

  const d = frequency.map((v, index) => days[index].substring(0, 2));

  return (
    <ToggleGroup.Root
      className="flex-1 flex"
      type="multiple"
      aria-label="Text alignment"
      onValueChange={handleFrequencyChange}
      defaultValue={BooleanToString(frequency)}
    >
      {Object.values(d).map((item, index) => (
        <ToggleGroup.Item
          key={index}
          value={item}
          aria-label="Left aligned"
          className={clsx(
            "flex-1 h-6 w-6 bg-purple-50 text-center p-1 data-[state=on]:bg-purple-100  data-[state=on]:text-purple-400 border-x border-y-0 border-solid border-x-purple-200 text-purple-300 first:border-0 last:border-0"
          )}
        >
          {item}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
