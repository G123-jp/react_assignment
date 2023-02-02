import { MealType, SelectedDishes } from '@/common/types';
import { capitalize } from '@/components/common/utils';

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
          <span className="text-gray-600">Meal</span>
          <span className="font-semibold">
            {capitalize(selectedMealType || '')}
          </span>
        </li>
        <li className="flex flex-row justify-between mt-4">
          <span className="text-gray-600">Number of people</span>
          <span className="font-semibold">{numOfPeople}</span>
        </li>
        <li className="flex flex-row justify-between mt-4">
          <span className="text-gray-600">Restaurant</span>
          <span className="font-semibold">{selectedRestaurant}</span>
        </li>
        <li className="flex flex-row justify-between mt-4 border-b border-solid pb-2">
          <span className="text-gray-600">Dishes:</span>
        </li>
        {Object.values(selectedDishes).map((dishServing) => {
          const {
            dish: { name, id },
            numberOfServing,
          } = dishServing;
          return (
            <li key={id} className="flex flex-row justify-between mt-2">
              <span className="font-semibold">{name}</span>
              <span className="font-semibold">{numberOfServing}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
