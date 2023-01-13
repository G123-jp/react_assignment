import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const StepThree = (): ReactElement => {
  return (
    <ContainerForm>
      <div className="grid grid-cols-4  grid-rows-2 gap-x-5 place-items-center">
        <label className="col-span-2 font-body1 mb-2" htmlFor="meal">
          Select a dish:
        </label>

        <label htmlFor="numberOfServings" className="font-body1 mb-2">
          Servings:
        </label>

        <div></div>

        <select
          className="col-span-2 text-center p-2 shadow-md w-[200px]"
          name="dish"
          id="dish"
          aria-roledescription="list of options"
          aria-label="list of dishes"
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

        <input
          className="font-body1 text-center p-2 shadow-md w-[70px]"
          name="numberOfServings"
          type="number"
          required
          min="1"
          max="10"
          aria-roledescription="input"
          aria-label="number of servings input"
        />

        <button className="row-span-2 shadow-sm bg-mustard p-2 uppercase rounded-full h-[50px] w-[50px]  font-heading hover:font-title hover:shadow-lg">
          {" "}
          +{" "}
        </button>
      </div>
{/* 
      <div className="grid grid-cols-2 gap-36 mt-10">
        <Button nextForm={"stepTwo"}>
          <p>Previous</p>
        </Button>
        <Button nextForm={"review"}>
          <p>Next</p>
        </Button>
      </div> */}
    </ContainerForm>
  );
};

export default StepThree;
