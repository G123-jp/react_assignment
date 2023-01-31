export default function OrderSummary() {
  return (
    <ul className="flex flex-col justify-center mt-4">
      <li className="flex flex-row justify-between">
        <span>Meal</span>
        <span>Breakfast</span>
      </li>
      <li className="flex flex-row justify-between">
        <span>Number of people</span>
        <span>3</span>
      </li>
      <li className="flex flex-row justify-between">
        <span>Restaurant</span>
        <span>McDonalds</span>
      </li>
      <li className="flex flex-row justify-between">
        <span>Dishes</span>
        <ul className="border border-solid border-blue-400 p-2 flex flex-col text-left">
          <li>Dish A - 1</li>
          <li>Dish B - 3</li>
          <li>Dish C - 2</li>
        </ul>
      </li>
    </ul>
  );
}
