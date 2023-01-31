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
    <div>
      <h2 className="text-lg mt-4">Select a restaurant:</h2>
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
