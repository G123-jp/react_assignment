export enum Meal {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner'
}

export interface DishItem {
  count: number
  item: string
}

export interface Order {
  meal: string
  peopleCount: number
  restaurant: string
  dishes: DishItem[]
}

export interface DishJsonItem {
  id: string
  name: string
  restaurant: string
  availableMeals: string[]
}
