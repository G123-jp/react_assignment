// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

export type RestaurantList = {
  restaurants: string[],
};

type Dish = {
    id: number,
    name: string,
    restaurant: string, 
    availableMeals: [],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RestaurantList>
) {
    const {mealType = ""} = req.query;

    const dataDirectory = path.join(process.cwd(),`data`);
    const dishesJson = await fs.readFile(`${dataDirectory}/dishes.json`, 'utf8');
    const dishes: Dish[] = JSON.parse(dishesJson)["dishes"];
    const restaurantsSet = new Set<string>();
    dishes.forEach(({restaurant, availableMeals}) => {
        if (!mealType || availableMeals.find((x) => x === mealType) !== undefined) {
            restaurantsSet.add(restaurant);
        }
    });
    const restaurants = Array.from(restaurantsSet);

    res.status(200).json({restaurants});
}
