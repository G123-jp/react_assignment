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

  interface OrderForm {
    meal: Meal
    number: number
    restaurant: string
    dishes: DishForm[]
  }

  interface StepComponentProps {
    orderForm: OrderForm
    setOrderForm: React.Dispatch<React.SetStateAction<OrderForm>>
  }

  interface SelectOption {
    value: string
    label: string
  }
}
