import { RestaurantList } from "@/pages/api/restaurants";
import { useEffect, useState } from "react";

type MealType = "breakfast" | "lunch" | "dinner";

export default function Step2Form({
  selectedMealType = "breakfast",
}: {
  selectedMealType?: MealType;
}) {
  const [data, setData] = useState<RestaurantList | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/restaurants?mealType=${selectedMealType}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-row justify-center mt-4">
      <select>
        <option value="">
          {isLoading ? "Loading restaurant list.." : "Pick a restaurant"}
        </option>
        {data &&
          data.restaurants.map((restaurant, idx) => (
            <option key={idx} value={restaurant}>
              {restaurant}
            </option>
          ))}
      </select>
    </div>
  );
}
