import * as RadioGroup from "@radix-ui/react-radio-group";
import React, { useState } from "react";
import clsx from "clsx";

export const ColorSelector = ({
  updateColor,
  selectedColor,
}: {
  updateColor: (color: string) => void;
  selectedColor: string;
}) => {
  const colors = [
    "#81968d",
    "#a2b099",
    "#debd8f",
    "#ffda93",
    "#f9ac78",
    "#bc8294",
    "#e55a79",
    "#9AC885",
  ];

  return (
    <RadioGroup.Root
      className="flex justify-between"
      aria-label="View density"
      onValueChange={(val: string) => {
        updateColor(val);
      }}
      defaultValue={selectedColor}
      required={true}
    >
      {colors.map((color, index) => (
        <div key={color} className="flex-col items-center">
          <RadioGroup.Item
            style={{
              backgroundColor: color,
            }}
            className={clsx("rounded-full h-8 w-8", {
              "shadow-[0_0_0_2px_black] ": color == selectedColor,
            })}
            value={color}
            id="r1"
          >
            <RadioGroup.Indicator className={clsx("RadioGroupIndicator")} />
          </RadioGroup.Item>
        </div>
      ))}
    </RadioGroup.Root>
  );
};
