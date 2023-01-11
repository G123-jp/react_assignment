import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const StepTwo = (): ReactElement => {

    return (
      <ContainerForm>
      <ProgressBar />
      <div id="selectMeal" className="flex flex-col items-center mb-10">
        <label className="font-body1 mb-2" htmlFor="meal">
          Please select a restaurant:
        </label>
        <select
          className="text-center p-2 shadow-md w-[200px]"
          name="meal"
          id="meal"
          aria-roledescription="list options"
          aria-label="list of restaurants"
          required
        >
          {/* <option 
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
           value="dinner">Dinner 🥘</option> */}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-36">
        <Button nextForm={"stepOne"}>
          <p className="">Previous</p>
        </Button>
        <Button nextForm={"stepThree"}>
          <p className="">Next</p>
        </Button>
      </div>
    </ContainerForm>
    );
  };
  
  export default StepTwo;