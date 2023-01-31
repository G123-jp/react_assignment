import { MealType } from "@/shared/types";

export default function Step2Form({
  selectedRestaurant,
  onRestaurantSelected,
  restaurants,
}: {
  selectedRestaurant: string;
  onRestaurantSelected: (restaurant: string) => void;
  restaurants: string[];
}) {
  return (
    <div className="flex flex-row justify-center mt-4">
      <select
        className="border border-solid border-blue-400 p-2"
        onChange={({ target: { value } }) => {
          onRestaurantSelected(value);
        }}
        value={selectedRestaurant}
      >
        <option value="">{"Pick a restaurant"}</option>
        {restaurants &&
          restaurants.map((restaurant, idx) => (
            <option key={idx} value={restaurant}>
              {restaurant}
            </option>
          ))}
      </select>
    </div>
  );
}
