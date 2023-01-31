import path from 'path';
import { promises as fs } from 'fs';
import { Dish } from './types';

export const readDishesFromFile = async () => {
    const dataDirectory = path.join(process.cwd(),`data`);
    const dishesJson = await fs.readFile(`${dataDirectory}/dishes.json`, 'utf8');
    const dishes: Dish[] = JSON.parse(dishesJson)["dishes"];

    return dishes;
};