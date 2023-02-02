import { Dish, SelectedDishes } from "@/common/types";
import Error from "../common/Error";
import { countTotalNumberOfServings } from "../../common/utils";
import { NumberInput } from "../common/NumberInput";

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
          const numOfServing = selectedDishes[`${dish.id}`]
            ? selectedDishes[`${dish.id}`].numberOfServing
            : 0;

          return (
            <li key={dish.id} className="flex flex-row justify-between mt-4">
              <span className="py-2">{dish.name}</span>
              <div className="flex-1 grow-0">
                <NumberInput
                  min={0}
                  value={numOfServing}
                  onChange={(newNumOfServing) => {
                    onUpdateDish(dish, newNumOfServing);
                  }}
                />
              </div>
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
