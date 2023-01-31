import { StateType } from "../shared/types";

const capitalize = (str: string) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function OrderSummary({
  selectedMealType,
  numOfPeople,
  selectedRestaurant,
  selectedDishes,
}: StateType) {
  return (
    <ul className="flex flex-col justify-center mt-4">
      <li className="flex flex-row justify-between mt-4">
        <span>Meal</span>
        <span>{capitalize(selectedMealType)}</span>
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
  );
}
