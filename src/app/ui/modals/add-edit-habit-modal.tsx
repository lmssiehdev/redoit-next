import * as Form from "@radix-ui/react-form";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/Modal";
import { useHabitStore } from "@/store/habits";
import type { Habit } from "@/types/habit-types";
import clsx from "clsx";
import { useImmerReducer } from "use-immer";
import { ArchivedToggle } from "../../component/Habit/HabitModal/ArchivedToggle";
import { ColorSelector } from "../../component/Habit/HabitModal/ColorSelector";
import { FrequencySelector } from "../../component/Habit/HabitModal/FrequencySelector";

const emptyHabit = {
  name: "",
  color: "#debd8f",
  frequency: Array(7).fill(true),
  archived: false,
};

type State = Pick<Habit.Definition, keyof typeof emptyHabit>;

type Action =
  | { type: "UPDATE_NAME"; value: string }
  | { type: "UPDATE_COLOR"; value: string }
  | { type: "UPDATE_FREQUENCY"; value: boolean[] }
  | { type: "UPDATE_ARCHIVED"; value: boolean }
  | { type: "RESET"; value?: typeof emptyHabit };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "UPDATE_NAME":
      state.name = action.value;
      return state;
    case "UPDATE_COLOR":
      state.color = action.value;
      return state;
    case "UPDATE_FREQUENCY":
      state.frequency = action.value;
      return state;
    case "RESET":
      if (action.value) {
        return action.value;
      }
      return {
        name: "",
        color: "#debd8f",
        frequency: Array(7).fill(true),
        archived: false,
      };
    case "UPDATE_ARCHIVED":
      state.archived = action.value;
      return state;
    default:
      // @ts-expect-error Property 'type' does not exist on type 'never'.
      throw new Error(`Invalid action type: ${action?.type}`);
  }
}

const HabitEditor = ({
  id,
  onSave,
  showModal,
  setShowModal,
}: {
  id?: string;
  onSave?: (payload: Partial<Habit.Definition>) => void;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const habit = useHabitStore((state) => (id ? state.habits[id] : emptyHabit));

  const { color, name, frequency, archived } = habit;

  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const [state, dispatch] = useImmerReducer(reducer, {
    color,
    name,
    frequency,
    archived,
  });

  const handleSave = () => {
    onSave && onSave(state);
    setShowModal(false);
  };

  const handleReset = () => {
    if (id) {
      dispatch({ type: "RESET", value: { color, name, frequency, archived } });
      return;
    }
    dispatch({ type: "RESET" });
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      onClose={handleReset}
      className="p-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-gray-900">
          {id ? "Edit Habit" : "Add Habit"}
        </h2>
      </div>

      <Form.Root
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Form.Field name="Habit Name">
          <Form.Label className="text-lg py-2 font-medium text-gray-700">
            Name
          </Form.Label>
          <Form.Control asChild>
            <Input
              maxLength={20}
              required
              className={clsx("mt-1  w-full box-border")}
              value={state.name}
              onChange={({ target }) =>
                dispatch({ type: "UPDATE_NAME", value: target.value })
              }
            />
          </Form.Control>
          <Form.Message match="valueMissing">
            Please provide a valid name
          </Form.Message>
          <Form.Message match="tooLong">Ey Vey</Form.Message>
        </Form.Field>
        <div>
          <label
            htmlFor="name"
            className="text-lg py-2 font-medium text-gray-700 inline-block"
          >
            Color
          </label>

          <ColorSelector
            updateColor={(value) => dispatch({ type: "UPDATE_COLOR", value })}
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
              dispatch({ type: "UPDATE_FREQUENCY", value })
            }
            frequency={state.frequency}
          />
        </div>

        {id && (
          <>
            <fieldset className="mt-4">
              <ArchivedToggle
                setIsArchived={(v) =>
                  dispatch({ type: "UPDATE_ARCHIVED", value: v })
                }
                isArchived={state.archived}
              />
            </fieldset>
          </>
        )}
        <div className="flex mt-5 justify-between items-center">
          {id && (
            <Button color="red" size="sm" onClick={() => deleteHabit(id)}>
              Delete Habit
            </Button>
          )}
          <Form.Submit asChild>
            <Button type="submit" color="green" className="ml-auto">
              {id ? "Update Habit" : "Add Habit"}
            </Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </Modal>
  );
};

export default HabitEditor;
