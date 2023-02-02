import { Dish, SelectedDishes } from "@/common/types";
import Error from "../common/Error";
import {
  countTotalNumberOfServings,
  parseIntWithFallback,
} from "../../common/utils";

export default function Step3Form({
  availableDishes,
  selectedDishes,
  onUpdateDish,
  errorMessage = "",
}: {
  availableDishes: Dish[];
  selectedDishes: SelectedDishes;
  onUpdateDish: (dish: Dish, numberOfServing: number) => void;
  errorMessage?: string;
}) {
  const totalNumServings = countTotalNumberOfServings(selectedDishes);

  return (
    <>
      <h2 className="text-xl mt-2 font-bold">Select Dishes</h2>
      <Error errorMessage={errorMessage} />
      <ul className="flex flex-col justify-center">
        {availableDishes.map((dish) => {
          return (
            <li key={dish.id} className="flex flex-row justify-between mt-4">
              <span className="p-2">{dish.name}</span>
              <input
                className="border border-solid border-blue-400 rounded-xl text-center p-2"
                type="number"
                min="0"
                max="10"
                value={
                  selectedDishes[`${dish.id}`]
                    ? selectedDishes[`${dish.id}`].numberOfServing
                    : 0
                }
                onChange={({ target: { value } }) => {
                  onUpdateDish(dish, parseIntWithFallback(value, 10, 0));
                }}
              />
            </li>
          );
        })}
        <li className="flex flex-row justify-between border border-solid border-black mt-4 rounded-lg mb-4">
          <span className="p-2 font-bold">Total servings:</span>
          <span className="p-2 font-bold">{totalNumServings}</span>
        </li>
      </ul>
    </>
  );
}
