// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { readDishesFromFile } from '@/shared/utils';
import { Dish } from '@/shared/types';

export type DishList = {
  dishes: Dish[],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DishList>
) {
    const {mealType = "", restaurant = ""} = req.query;

    const unfilteredDishes: Dish[] = await readDishesFromFile();
    const dishes = unfilteredDishes.filter((dish) => {
        const mealTypeMatched =  !mealType || dish.availableMeals.find((x) => x === mealType) !== undefined;
        const restaurantMatched = !restaurant || dish.restaurant === restaurant;

        return mealTypeMatched && restaurantMatched;
    });

    res.status(200).json({dishes});
}
