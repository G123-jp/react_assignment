import { MealType, mealTypes } from "@/common/types";
import { ReactNode } from "react";
import Error from "../common/Error";
import { capitalize, parseIntWithFallback } from "../../common/utils";

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
  selectedMealType: MealType | null;
  onMealTypeSelected: (mealType: MealType) => void;
}) => {
  return (
    <>
      {mealTypes.map((mealType) => {
        return (
          <MealTypeButton
            onClick={() => onMealTypeSelected(mealType)}
            isSelected={selectedMealType === mealType}
            key={mealType}
          >
            {capitalize(mealType)}
          </MealTypeButton>
        );
      })}
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
  selectedMealType: MealType | null;
  onNumOfPeopleChanged: (numOfPeople: number) => void;
  numOfPeople: number;
  errorMessage?: string;
}) {
  return (
    <>
      <h2 className="text-xl mt-2 font-bold">
        Step 1: Select Meal Type & Number of People
      </h2>
      <Error errorMessage={errorMessage} />
      <h3 className="text-lg mt-2">Select a meal:</h3>
      <div className="flex flex-row justify-center">
        <MealTypeGroupButton
          selectedMealType={selectedMealType}
          onMealTypeSelected={onMealTypeSelected}
        />
      </div>
      <h3 className="text-lg mt-4">Number of people:</h3>
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
