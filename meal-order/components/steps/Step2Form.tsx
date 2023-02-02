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
      <h2 className="text-xl mt-2 font-bold">Select a Restaurant</h2>
      <Error errorMessage={errorMessage} />
      <div className="flex flex-col space-y-4 mb-4">
        {restaurants &&
          restaurants.map((restaurant, idx) => {
            const isSelected = restaurant === selectedRestaurant;
            let className =
              "font-semibold py-2 border border-solid border-blue-600 hover:bg-blue-600 hover:text-white";
            if (isSelected) {
              className = `${className} bg-blue-600 text-white`;
            } else {
              className = `${className} bg-white text-black`;
            }
            return (
              <button
                onClick={() => onRestaurantSelected(restaurant)}
                className={className}
                key={idx}
              >
                {restaurant}
              </button>
            );
          })}
      </div>
    </>
  );
}
