import { MealType, SelectedDishes } from "@/common/types";
import { capitalize } from "@/common/utils";

type OrderSummaryPropType = {
  selectedMealType: MealType | null;
  numOfPeople: number;
  selectedRestaurant: string;
  selectedDishes: SelectedDishes; // dish id mapping to Dish Serving
};

export default function OrderSummary({
  selectedMealType,
  numOfPeople,
  selectedRestaurant,
  selectedDishes,
}: OrderSummaryPropType) {
  return (
    <>
      <h2 className="text-xl mt-2 font-bold">Review Your Order</h2>
      <ul className="flex flex-col justify-center mt-4">
        <li className="flex flex-row justify-between mt-4">
          <span>Meal</span>
          <span>{capitalize(selectedMealType || "")}</span>
        </li>
        <li className="flex flex-row justify-between mt-4">
          <span>Number of people</span>
          <span>{numOfPeople}</span>
        </li>
        <li className="flex flex-row justify-between mt-4">
          <span>Restaurant</span>
          <span>{selectedRestaurant}</span>
        </li>
        <li className="flex flex-row justify-between mt-4">
          <span>Dishes</span>
          <ul className="border border-solid border-blue-400 p-2 flex flex-col text-left">
            {Object.values(selectedDishes).map((dishServing) => {
              const {
                dish: { name, id },
                numberOfServing,
              } = dishServing;
              return (
                <li key={id}>
                  {name} - {numberOfServing}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </>
  );
}
