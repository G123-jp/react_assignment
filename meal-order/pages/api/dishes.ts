import type { NextApiRequest, NextApiResponse } from 'next'
import { Dish } from '@/common/types';
import { readDishesFromFile } from '@/common/api-utils';

export type DishList = {
  dishes: Dish[],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DishList>
) {
    const {mealType = "", restaurant = ""} = req.query;

    const unfilteredDishes: Dish[] = await readDishesFromFile();
    setTimeout(() =>{
      const dishes = unfilteredDishes.filter((dish) => {
          const mealTypeMatched =  !mealType || dish.availableMeals.find((x) => x === mealType) !== undefined;
          const restaurantMatched = !restaurant || dish.restaurant === restaurant;

          return mealTypeMatched && restaurantMatched;
      });
      res.status(200).json({dishes});
    }, 2000); // simulate backend delay
    
}
