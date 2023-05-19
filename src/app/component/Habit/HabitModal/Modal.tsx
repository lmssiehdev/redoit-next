import * as Dialog from "@radix-ui/react-dialog";

import React, { useReducer, useState } from "react";

import { CrossIcon } from "@/app/component/Icons";
import Button from "@/components/common/Button";
import { IHabit, useHabitStore } from "@/store/habits";
import { ArchivedToggle } from "./ArchivedToggle";
import { FrequencySelector } from "./FrequencySelector";
import { ColorSelector } from "./ColorSelector";
import clsx from "clsx";
import Input from "@/components/common/Input";

const emptyHabit = {
  name: "",
  color: "#debd8f",
  frequency: Array(7).fill(true),
  archived: false,
};

type HabitAction =
  | { type: "name"; value: string }
  | { type: "color"; value: string }
  | { type: "frequency"; value: boolean[] }
  | { type: "archived"; value: boolean }
  | { type: "reset"; value?: typeof emptyHabit };

function habitReducer(state: Partial<IHabit>, action: HabitAction) {
  switch (action.type) {
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
      if (action.value) {
        return action.value;
      }
      return {
        name: "",
        color: "#debd8f",
        frequency: Array(7).fill(true),
      };
    case "archived":
      return {
        ...state,
        archived: action.value,
      };
    default:
      // @ts-expect-error Property 'type' does not exist on type 'never'.
      throw new Error(`Invalid action type: ${action?.type}`);
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
  const { color, name, frequency, archived } = useHabitStore((state) =>
    id ? state.habits[id] : emptyHabit
  );
  const editHabit = useHabitStore((state) => state.editHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const [state, dispatch] = useReducer(habitReducer, {
    color,
    name,
    frequency,
    archived,
  });

  const [error, setError] = useState<string | null>();

  const handleClose = () => {
    onClose(state);
    return;
  };

  const handleSave = () => {
    setError(null);
    if (state.name === "") {
      setError("Please enter a name");
    }

    if (id) {
      editHabit(id, state);
    } else onClose(state);
  };

  const handleReset = () => {
    setError(null);
    if (id) {
      dispatch({ type: "reset", value: { color, name, frequency, archived } });
      return;
    }
    dispatch({ type: "reset" });
  };

  const handleDelete = () => {
    if (id) deleteHabit(id);
  };

  return (
    <Dialog.Root onOpenChange={handleReset}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content
          className={clsx(
            "fixed z-50",
            "w-[95vw] max-w-[400px] rounded-lg p-4 md:w-full",
            "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
            "bg-white",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          )}
        >
          <Dialog.Title className="text-2xl font-medium text-gray-900">
            {id ? "Edit Habit" : "Add Habit"}
          </Dialog.Title>
          {/* <Dialog.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            {"Make changes to your profile here. Click save when you're done."}
          </Dialog.Description> */}
          {JSON.stringify(state)}
          <div>
            <label
              htmlFor="name"
              className="text-lg py-2 font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              className={clsx("mt-1  w-full box-border")}
              id="name"
              value={state.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch({ type: "name", value: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="text-lg py-2 font-medium text-gray-700 inline-block"
            >
              Color
            </label>

            <ColorSelector
              updateColor={(value) => dispatch({ type: "color", value })}
              selectedColor={state.color || emptyHabit.color}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="text-lg py-2 font-medium text-gray-700 inline-block"
            >
              Frequency
            </label>

            <FrequencySelector
              updateFrequency={(value) =>
                dispatch({ type: "frequency", value })
              }
              frequency={state.frequency || emptyHabit.frequency}
            />
          </div>

          {id && (
            <>
              <fieldset className="mt-4">
                <ArchivedToggle
                  setIsArchived={(v) =>
                    dispatch({ type: "archived", value: v })
                  }
                  // @ts-expect-error
                  isArchived={state.archived || emptyHabit.archived}
                />
              </fieldset>
            </>
          )}
          <span className="text-red-500 py-1">{error}</span>
          <div className="flex mt-5 justify-between items-center">
            {id && (
              <Button color="red" size="sm" onClick={() => handleDelete()}>
                Delete Habit
              </Button>
            )}
            <Dialog.Close onClick={() => handleSave()}>
              <Button color="green">{id ? "Update Habit" : "Add Habit"}</Button>
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

export default DialogDemo2;
