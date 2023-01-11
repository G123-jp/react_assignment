import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const StepThree = (): ReactElement => {

    return (
         <ContainerForm>
      <ProgressBar />

      <div id="selectMeal" className="flex flex-col mb-5">
        <label className="font-body1 mb-2" htmlFor="meal">
          Please select a meal:
        </label>
        <select name="meal" id="meal" required>
          <option value="">---</option>
          <option value="breakfast">Breakfast 🥞</option>
          <option value="lunch">Lunch 🍔</option>
          <option value="dinner">Dinner 🥘</option>
        </select>
      </div>

      <div id="selectNumberOfPeople" className="flex flex-col">
        <label htmlFor="numberOfPeople" className="font-body1 mb-2">
          Number of People:
        </label>
        <input name="numberOfPeople" type="number" required min="1" max="10" />
      </div>

      <div className="grid grid-cols-2 gap-36">
        <Button nextForm={"start"}>
          <p className="">Previous</p>
        </Button>
        <Button nextForm={"stepTwo"}>
          <p className="">Next</p>
        </Button>
      </div>
    </ContainerForm>
    );
  };
  
  export default StepThree;