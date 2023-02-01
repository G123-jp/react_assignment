import Error from "../shared/Error";

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
      <Error errorMessage={errorMessage} />
      <h2 className="text-lg mt-2">Select a restaurant:</h2>
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
    </>
  );
}
