import React, { type ReactElement, useEffect, useState } from "react";
import { type MenuItem } from "../../types/global";

type data = {
  restaurant: string;
};
type stepTwoProps = data & {
  updateData: (data: Partial<data>) => void;
  menuData: MenuItem[];
  setSelectedRestaurant: (restaurant: string) => void;
  // selectedMeal: string;
};

const StepTwo = (props: stepTwoProps): ReactElement => {
  const { restaurant, updateData, menuData, setSelectedRestaurant} = props;
  const [restaurantList, setRestaurantList] = useState<string[]>([]);

  useEffect(() => {
    let restaurantNamesArray: string[] = [];
    for (const menu of menuData) {
      restaurantNamesArray.push(menu.restaurant);
    }
    const restaurantArray = Array.from(new Set(restaurantNamesArray));
    setRestaurantList(restaurantArray);
  }, [menuData]);

  console.log(restaurantList);
  console.log("🍔", menuData);

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
          {restaurantList!.map((restaurant) => {
            return (
              
              <option
                role="option"
                aria-selected="true"
                value={restaurant}
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
