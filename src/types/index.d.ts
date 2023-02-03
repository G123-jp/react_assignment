/**
 * All Types in this project
 */
namespace Types {
  /**
   * Static dishes data
   */
  interface DishesData {
    id: number
    name: string
    restaurant: string
    availableMeals: string[]
  }
  /**
   * Meal in three type
   */
  type Meal = 'breakfast' | 'lunch' | 'dinner'
  /**
   * Progress item
   */
  interface ProgressItem {
    title: string
    component: JSX.Element
    status?: 'wait' | 'process' | 'finish' | 'error'
  }
  /**
   * Dish form
   */
  interface DishForm {
    dish: string
    number: number
  }
  /**
   * Order form data
   */
  interface OrderForm {
    meal: Meal
    number: number
    restaurant: string
    dishes: DishForm[]
  }
  /**
   * Step component props
   */
  interface StepComponentProps {
    orderForm: OrderForm
    setOrderForm: React.Dispatch<React.SetStateAction<OrderForm>>
  }
  /**
   * Select component option
   */
  interface SelectOption {
    value: string
    label: string
  }
}
