// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Dish } from '@/shared/types';
import { readDishesFromFile } from '@/shared/utils';

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

    res.status(200).json({restaurants});
}
