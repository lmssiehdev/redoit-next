import React, { useReducer, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Toggle from "@radix-ui/react-toggle";

import "../../globals.css";
import clsx from "clsx";
import { useEffect } from "react";
import { IHabit, useHabitStore } from "@/app/store/habits";
import { CrossIcon } from "@/app/component/Icons";
import Button from "@/components/common/Button";

interface Habit {
  name: string;
  color: string;
  frequency: boolean[];
}

type HabitAction =
  | { type: "init"; id: number; habits: Habit[] }
  | { type: "name"; value: string }
  | { type: "color"; value: string }
  | { type: "frequency"; value: boolean[] }
  | { type: "reset" };

function habitReducer(state: Habit, action: HabitAction) {
  switch (action.type) {
    case "init":
      return {
        name: action.habits[action.id]?.name || "",
        color: action.habits[action.id]?.color || "#debd8f",
        frequency: action.habits[action.id]?.frequency || Array(7).fill(true),
      };
    case "name":
      return {
        ...state,
        name: action.value,
      };
    case "color":
      return {
        ...state,
        color: action.value,
      };
    case "frequency":
      return {
        ...state,
        frequency: action.value,
      };
    case "reset":
      return {
        name: "",
        color: "#debd8f",
        frequency: Array(7).fill(true),
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const DialogDemo2 = ({
  id,
  onClose,
  children,
}: {
  id?: string;
  onClose: (payload: Partial<IHabit>) => void;
  children: React.ReactNode;
}) => {
  const habits = useHabitStore((state) => state.habits);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  // TODO: refactor with useReducer
  const [state, dispatch] = useReducer(habitReducer, {
    name: "",
    color: "#debd8f",
    frequency: Array(7).fill(true),
  });

  // const [habitName, setHabitName] = useState<string>(
  //   id ? habits[id]?.name : ""
  // );
  // const [habitColor, setHabitColor] = useState<string>(
  //   id ? habits[id]?.color : ""
  // );
  // const [habitFrequency, setHabitFrequency] = useState<boolean[]>(
  //   id ? habits[id]?.frequency : Array(7).fill(true)
  // );

  const handleClose = () => {
    onClose(state);
    return;
  };

  const handleDelete = () => {
    if (id) deleteHabit(id);
  };

  function cleanUp() {
    dispatch({ type: "reset" });
  }

  // const handleClose = () => {
  //   console.log(habitName);
  //   onClose({
  //     name: habitName,
  //     color: habitColor,
  //     frequency: habitFrequency,
  //   });
  //   return;
  // };

  // const handleDelete = () => {
  //   // TODO: add comfirmation
  //   if (id) deleteHabit(id);
  // };

  // function cleanUp() {
  //   setHabitName(id ? habits[id]?.name : "");
  //   setHabitColor(id ? habits[id]?.color : "#debd8f");
  //   setHabitFrequency(id ? habits[id]?.frequency : Array(7).fill(true));
  // }

  return (
    <Dialog.Root onOpenChange={cleanUp}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className=" text-black bg-white outline-none z-20 rounded fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90vw] max-w-[450px] max-h-[85vh] p-5 shadow-md focus:outline-none">
          <Dialog.Title className="flex items-center justify-between">
            Add Habit
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {"Make changes to your profile here. Click save when you're done."}
          </Dialog.Description>
          {JSON.stringify(state)}
          <fieldset className="flex items-center gap-10 my-2 mt-[20px]  ">
            <label htmlFor="name">Name</label>
            <input
              className="Input"
              id="name"
              value={state.name}
              onChange={({ target }) =>
                dispatch({ type: "name", value: target.value })
              }
              defaultValue="Pedro Duarte"
            />
          </fieldset>
          <fieldset className="flex items-center gap-10 my-2 mt-[20px]  ">
            <label htmlFor="name">Color</label>

            <ColorSelector
              updateColor={(value) => dispatch({ type: "color", value })}
              defaultColor={state.color}
            />
          </fieldset>
          <fieldset className="flex items-center gap-10 my-2 mt-[20px]  ">
            <label htmlFor="name">Frequency</label>

            <FrequencySelector
              updateFrequency={(value) =>
                dispatch({ type: "frequency", value })
              }
              defaultFrequency={state.frequency}
            />
          </fieldset>
          <fieldset className="flex items-center gap-10 my-2 mt-[20px]  ">
            <label htmlFor="name">Archive</label>

            <ArchivedToggle />
          </fieldset>

          {id && (
            <div className="flex flex-end gap-10 my-2 mt-[20px] ">
              <Button color="red" size="sm" onClick={() => handleDelete()}>
                Delete
              </Button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close onClick={() => handleClose()}>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <CrossIcon className="h-3 text-black" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const ColorSelector = ({
  updateColor,
  defaultColor,
}: {
  updateColor: (color: string) => void;
  defaultColor: string;
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const colors = [
    "#81968d",
    "#a2b099",
    "#debd8f",
    "#ffda93",
    "#f9ac78",
    "#bc8294",
  ];

  return (
    <RadioGroup.Root
      className="flex gap-2"
      aria-label="View density"
      onValueChange={(val: string) => {
        updateColor(val);
        setSelectedColor(val);
      }}
      defaultValue={selectedColor}
      required={true}
    >
      {colors.map((color, index) => (
        <div
          key={color}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <RadioGroup.Item
            style={{
              backgroundColor: color,
            }}
            className={clsx("rounded-full h-6 w-6", {
              "shadow-[0_0_0_2px_black] ": color == selectedColor,
            })}
            value={color}
            id="r1"
          >
            <RadioGroup.Indicator className={clsx("RadioGroupIndicator")} />
          </RadioGroup.Item>
          {/* <label className="Label" htmlFor="r1">
              {color}
            </label> */}
        </div>
      ))}
    </RadioGroup.Root>
  );
};

export const FrequencySelector = ({
  updateFrequency,
  defaultFrequency,
}: {
  defaultFrequency: boolean[];
  updateFrequency: (value: boolean[]) => void;
}) => {
  const [selectedColor, setSelectedColor] =
    useState<boolean[]>(defaultFrequency);

  const handleValueChange = (value: string[]) => {
    setSelectedColor(value);
    console.log(value);
  };

  // TODO: rewrite this mess, I'm sure there is a better way to do this.

  useEffect(() => {
    const generateArrayBasedOnIndex = Array(7)
      .fill(false)
      .map((item, index) => selectedColor.includes(index));
    console.log(generateArrayBasedOnIndex);

    updateFrequency(generateArrayBasedOnIndex);
  }, [selectedColor]);

  return (
    <ToggleGroup.Root
      className="flex-1 flex gap-1 "
      type="multiple"
      aria-label="Text alignment"
      onValueChange={handleValueChange}
      defaultValue={defaultFrequency}
    >
      {Array(7)
        .fill(true)
        .map((item, index) => (
          <ToggleGroup.Item
            key={index}
            value={index}
            aria-label="Left aligned"
            className={clsx("flex-1 h-6 w-6 bg-red-50  text-center", {
              "shadow-[0_0_0_2px_black] bg-red-500 ":
                selectedColor.includes(index),
            })}
          >
            {index}
          </ToggleGroup.Item>
        ))}
    </ToggleGroup.Root>
  );
};

const ArchivedToggle = () => {
  const [isArchived, setIsArchived] = useState<boolean>();
  return (
    <>
      {/* <Toggle.Root
        onPressedChange={setIsArchived}
        className="data-[state='on']:bg-red-400"
        aria-label="Toggle italic"
      >
        {isArchived ? "unarchive" : "archive"}
      </Toggle.Root> */}

      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox">Checkbox</label>
    </>
  );
};

export default DialogDemo2;
