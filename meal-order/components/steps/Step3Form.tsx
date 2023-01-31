import { Dish, SelectedDishes } from "@/components/shared/types";

export default function Step3Form({
  availableDishes,
  selectedDishes,
  onUpdateDish,
}: {
  availableDishes: Dish[];
  selectedDishes: SelectedDishes;
  onUpdateDish: (dish: Dish, numberOfServing: number) => void;
}) {
  const totalNumServings = Object.values(selectedDishes).reduce(
    (prevValue, { numberOfServing }) => {
      return prevValue + numberOfServing;
    },
    0
  );

  return (
    <ul className="flex flex-col justify-center mt-4">
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
                let numberOfServing = Number.parseInt(value);
                if (numberOfServing === Number.NaN) {
                  numberOfServing = 0;
                }
                onUpdateDish(dish, numberOfServing);
              }}
            />
          </li>
        );
      })}
      <li className="flex flex-row justify-between border border-solid border-black mt-4 rounded-lg">
        <span className="p-2 font-bold">Total servings:</span>
        <span className="p-2 font-bold">{totalNumServings}</span>
      </li>
    </ul>
  );
}
