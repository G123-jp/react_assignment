import type { NextApiRequest, NextApiResponse } from 'next'
import { Dish } from '@/common/types';
import { readDishesFromFile } from '@/common/api-utils';
import { setTimeout } from "timers/promises";

export type RestaurantList = {
  restaurants: string[],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RestaurantList>
) {
    const {mealType = ""} = req.query;
    const dishes: Dish[] = await readDishesFromFile();
    const restaurantsSet = new Set<string>();
    dishes.forEach(({restaurant, availableMeals}) => {
        if (!mealType || availableMeals.find((x) => x === mealType) !== undefined) {
            restaurantsSet.add(restaurant);
        }
    });
    const restaurants = Array.from(restaurantsSet);

    await setTimeout(2000); // simulate backend delay
    res.status(200).json({restaurants});
}
