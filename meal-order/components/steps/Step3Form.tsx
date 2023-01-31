import { Dish } from "@/shared/types";

export default function Step3Form({
  availableDishes,
}: {
  availableDishes: Dish[];
}) {
  return (
    <ul className="flex flex-col justify-center mt-4">
      {availableDishes.map((dish) => {
        return (
          <li key={dish.id} className="flex flex-row justify-between">
            <span className="p-2">{dish.name}</span>
            <input
              className="border border-solid border-blue-400 rounded text-center p-2"
              type="number"
              min="0"
              max="10"
              placeholder="0"
            />
          </li>
        );
      })}
    </ul>
  );
}
