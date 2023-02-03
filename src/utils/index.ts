/**
 * get restaurants by meal type
 * @param data dishes data
 * @param meal meal type
 * @returns dishes data filtered by meal type
 */
export function getRestaurantsByMeal(data: Types.DishesData[], meal: Types.Meal): string[] {
  return Array.from(new Set(data.filter(dish => dish.availableMeals.includes(meal)).map(item => item.restaurant)))
}

/**
 * get available dish by restaurant
 * @param data dishes data in same meal type
 * @param restaurant restaurant name
 * @returns food names available in the restaurant
 */
export function getAvailableDishByRestaurant(data: Types.DishesData[], meal: Types.Meal, restaurant: string): string[] {
  return data
    .filter(dish => dish.availableMeals.includes(meal))
    .filter(dish => dish.restaurant === restaurant)
    .map(dish => dish.name)
}

/**
 * generate random 8 characters string
 * @returns random 8 characters string
 */
export function generateRandomID(length = -8): string {
  return Math.random().toString(36).slice(length)
}
