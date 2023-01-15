import { type ReactElement, useEffect, useState } from "react";
import { type MenuItem } from "../../types/global";

type data = {
  restaurant: string;
};
type stepTwoProps = data & {
  updateData: (data: Partial<data>) => void;
  filteredMealMenu: MenuItem[];
  setSelectedRestaurant: (restaurant: string) => void;
};

const StepTwo = (props: stepTwoProps): ReactElement => {
  const { restaurant, updateData, filteredMealMenu, setSelectedRestaurant } =
    props;
  const [restaurantList, setRestaurantList] = useState<string[]>([]);

  useEffect(() => {
    let restaurantNamesArray: string[] = [];
    for (const menu of filteredMealMenu) {
      restaurantNamesArray.push(menu.restaurant);
    }
    const restaurantArray = Array.from(new Set(restaurantNamesArray));
    setRestaurantList(restaurantArray);
  }, [filteredMealMenu]);

  return (
    <>
      <div id="selectMeal" className="flex flex-col items-center mb-10">
        <label className="font-body1 mb-2" htmlFor="meal">
          Please select a restaurant:
        </label>
        <select
          className="text-center p-2 shadow-md w-[200px]"
          name="meal"
          id="meal"
          value={restaurant}
          onChange={(e) => {
            updateData({ restaurant: e.target.value });
            setSelectedRestaurant(e.target.value);
          }}
          aria-roledescription="list options"
          aria-label="list of restaurants"
          required
        >
          <option role="option" aria-selected="false" value="" key="0">
            ---
          </option>
          {restaurantList!.map((restaurant, index) => {
            return (
              <option
                role="option"
                aria-selected="false"
                value={restaurant}
                key={index + 100}
              >
                {restaurant}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default StepTwo;
