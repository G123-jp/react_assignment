import React, {
  type ReactElement,
} from "react";

type data = {
  mealType: string;
  numberOfPeople: string;
};
type stepOneProps = data & {
  updateData: (data: Partial<data>) => void;
  setSelectedMeal: (meal: string) => void;
};

const StepOne = (props: stepOneProps): ReactElement => {
  const { mealType, numberOfPeople, updateData, setSelectedMeal } = props;

  return (
    <>
      <div id="selectMeal" className="flex flex-col items-center mb-10">
        <label className="font-body1 mb-2" htmlFor="meal">
          Please select a meal:
        </label>
        <select
          autoFocus
          className="text-center p-2 shadow-md w-[200px]"
          name="meal"
          id="meal"
          aria-roledescription="options"
          aria-label="list of meals"
          value={mealType}
          onChange={(e) => {
            updateData({ mealType: e.target.value });
            setSelectedMeal(e.target.value);
          }}
          required
        >
          <option role="option" aria-selected="true" value="">
            ---
          </option>
          <option role="option" aria-selected="false" value="breakfast">
            Breakfast 🥞
          </option>
          <option role="option" aria-selected="false" value="lunch">
            Lunch 🍔
          </option>
          <option role="option" aria-selected="false" value="dinner">
            Dinner 🥘
          </option>
        </select>
      </div>

      <div id="selectNumberOfPeople" className="flex flex-col">
        <label htmlFor="numberOfPeople" className="font-body1 mb-2">
          Number of People:
        </label>
        <input
          className="font-body1 text-center p-2 shadow-md"
          name="numberOfPeople"
          type="number"
          value={numberOfPeople}
          onChange={(e) => {
            updateData({ numberOfPeople: e.target.value });
          }}
          min="1"
          max="10"
          aria-roledescription="input"
          aria-label="number of people input"
          required
        />
      </div>
    </>
  );
};

export default StepOne;
