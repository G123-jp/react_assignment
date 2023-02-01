namespace Types {
  interface DishesData {
    id: number
    name: string
    restaurant: string
    availableMeals: string[]
  }

  type Meal = 'breakfast' | 'lunch' | 'dinner'

  interface ProgressItem {
    title: string
    component: JSX.Element
    status?: 'wait' | 'process' | 'finish' | 'error'
  }

  interface DishForm {
    dish: string
    number: number
  }
}
