import { MealType } from "@/components/shared/types";
import { ReactNode } from "react";
import Error from "../shared/Error";
import { parseIntWithFallback } from "../shared/utils";

const MealTypeButton = ({
  isSelected = false,
  children,
  onClick,
}: {
  isSelected?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) => {
  let className = "mx-1 p-2 text-lg font-bold";
  if (isSelected) {
    className = "bg-blue-400 text-white mx-1 p-2 text-lg font-bold rounded-xl";
  }
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

const MealTypeGroupButton = ({
  selectedMealType,
  onMealTypeSelected,
}: {
  selectedMealType: MealType;
  onMealTypeSelected: (mealType: MealType) => void;
}) => {
  return (
    <>
      <MealTypeButton
        onClick={() => onMealTypeSelected("breakfast")}
        isSelected={selectedMealType === "breakfast"}
      >
        Breakfast
      </MealTypeButton>
      <MealTypeButton
        onClick={() => onMealTypeSelected("lunch")}
        isSelected={selectedMealType === "lunch"}
      >
        Lunch
      </MealTypeButton>
      <MealTypeButton
        onClick={() => onMealTypeSelected("dinner")}
        isSelected={selectedMealType === "dinner"}
      >
        Dinner
      </MealTypeButton>
    </>
  );
};

export default function Step1Form({
  onMealTypeSelected,
  selectedMealType,
  onNumOfPeopleChanged,
  numOfPeople,
  errorMessage = "",
}: {
  onMealTypeSelected: (mealType: MealType) => void;
  selectedMealType: MealType;
  onNumOfPeopleChanged: (numOfPeople: number) => void;
  numOfPeople: number;
  errorMessage?: string;
}) {
  return (
    <>
      <Error errorMessage={errorMessage} />
      <h2 className="text-lg mt-2">Select a meal:</h2>
      <div className="flex flex-row justify-center">
        <MealTypeGroupButton
          selectedMealType={selectedMealType}
          onMealTypeSelected={onMealTypeSelected}
        />
      </div>
      <h2 className="text-lg mt-4">Number of people:</h2>
      <div>
        <input
          className="border border-solid border-blue-400 rounded text-center p-2"
          type="number"
          min="1"
          max="10"
          value={numOfPeople}
          onChange={({ target: { value } }) => {
            onNumOfPeopleChanged(parseIntWithFallback(value, 10, 1)); // fallback to 1 person if input is invalid
          }}
        />
      </div>
    </>
  );
}
