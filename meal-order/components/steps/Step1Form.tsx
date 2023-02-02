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
  let className = `grow border-gray-200 hover:bg-blue-600 hover:border-blue-600 inline-flex items-center justify-center border py-[10px] px-[12px] text-center text-base font-semibold text-black transition-all hover:text-white sm:py-3 sm:px-6 sm:text-base`;
  if (isSelected) {
    className = `grow border-blue-600 bg-blue-600 hover:bg-blue-600 hover:border-blue-600 inline-flex items-center justify-center border py-[10px] px-[12px] text-center text-base font-semibold text-white transition-all hover:text-white sm:py-3 sm:px-6`;
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
    <div className="inline-flex justify-center">
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
    </div>
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
        Select Meal Type & Number of People
      </h2>
      <Error errorMessage={errorMessage} />
      <h3 className="text-lg mt-2">Select a meal:</h3>
      <MealTypeGroupButton
        selectedMealType={selectedMealType}
        onMealTypeSelected={onMealTypeSelected}
      />
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
