/**
 * get restaurants by meal type
 * @param data dishes data
 * @param meal meal type
 * @returns dishes data filtered by meal type
 */
export function getRestaurantsByMeal(data: Types.DishesData[], meal: Types.Meal): Types.DishesData[] {
  return data.filter(dish => dish.availableMeals.includes(meal))
}

/**
 * get available meal by restaurant
 * @param data dishes data in same meal type
 * @param restaurant restaurant name
 * @returns food names available in the restaurant
 */
export function getAvailableMealByRestaurant(data: Types.DishesData[], restaurant: string): string[] {
  return data.filter(dish => dish.restaurant === restaurant).map(dish => dish.name)
}
