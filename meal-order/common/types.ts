export const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;
export type MealType = (typeof mealTypes)[number];

export type Dish = {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: [];
};

type DishServing = { dish: Dish; numberOfServing: number };
export type SelectedDishes = { [id: string]: DishServing };
