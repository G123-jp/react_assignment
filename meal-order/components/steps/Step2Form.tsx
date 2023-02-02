import Error from "../common/Error";

export default function Step2Form({
  selectedRestaurant,
  onRestaurantSelected,
  restaurants,
  errorMessage = "",
}: {
  selectedRestaurant: string;
  onRestaurantSelected: (restaurant: string) => void;
  restaurants: string[];
  errorMessage?: string;
}) {
  return (
    <>
      <h2 className="text-xl mt-2 font-bold">Step 2: Select a Restaurant</h2>
      <Error errorMessage={errorMessage} />
      <select
        className="border border-solid border-blue-400 p-2 mt-2"
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
    </>
  );
}
