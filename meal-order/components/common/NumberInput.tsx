import { ChangeEventHandler, useState } from "react";
import { parseIntWithFallback } from "@/common/utils";

export const NumberInput = ({
  name,
  onChange = () => {},
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  value,
}: {
  name?: string;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  value?: number;
}) => {
  const [currentValue, setValue] = useState<number>(value ?? min);

  const onDecrement = () => {
    if (currentValue > min) {
      onChange(currentValue - 1);
      setValue(currentValue - 1);
    }
  };

  const onIncrement = () => {
    if (currentValue < max) {
      onChange(currentValue + 1);
      setValue(currentValue + 1);
    }
  };

  const onManualChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value: newValueStr },
  }) => {
    const newValue = parseIntWithFallback(newValueStr, 10, min);
    onChange(newValue);
    setValue(newValue);
  };

  return (
    <div className="flex flex-row h-10 rounded-lg relative bg-transparent">
      <button
        data-action="decrement"
        onClick={onDecrement}
        className={`bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none ${
          currentValue === 0 ? "invisible" : ""
        }`}
      >
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        className={`${
          currentValue === 0 ? "invisible" : ""
        } outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black flex items-center text-gray-700`}
        name={name}
        min={min}
        max={max}
        value={currentValue}
        onChange={onManualChange}
      ></input>
      <button
        data-action="increment"
        onClick={onIncrement}
        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};
