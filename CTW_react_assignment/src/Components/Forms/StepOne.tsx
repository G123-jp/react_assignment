import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const StepOne = (): ReactElement => {
  return (
    <ContainerForm>
      <div id="selectMeal" className="flex flex-col items-center mb-10">
        <label className="font-body1 mb-2" htmlFor="meal">
          Please select a meal:
        </label>
        <select
          className="text-center p-2 shadow-md w-[200px]"
          name="meal"
          id="meal"
          aria-roledescription="options"
          aria-label="list of meals"
          required
        >
          <option 
           role="option"
           aria-selected="true"
           value="">---</option>
          <option 
           role="option"
           aria-selected="false"
           value="breakfast">Breakfast 🥞</option>
          <option 
           role="option"
           aria-selected="false"
           value="lunch">Lunch 🍔</option>
          <option 
           role="option"
           aria-selected="false"
           value="dinner">Dinner 🥘</option>
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
          required
          min="1"
          max="10"
          aria-roledescription="input"
          aria-label="number of people input"
        />
      </div>
    </ContainerForm>
  );
};

export default StepOne;
