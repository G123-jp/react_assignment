import { createContext, useContext } from 'react'

import { OptionItem } from '@/hooks/useOptions'
import { Order } from '@/types'

export const DEFAULT_ORDER: Order = {
  meal: '',
  peopleCount: 1,
  restaurant: '',
  dishes: [
    {
      item: '',
      count: 1
    }
  ]
}

interface IAppContext {
  mealOptions: OptionItem[]
  restaurantOptions: OptionItem[]
  dishOptions: OptionItem[]
  register?: any
  errors?: any
  control?: any
  getValues?: any
}

export const AppContext = createContext<IAppContext>({
  mealOptions: [],
  restaurantOptions: [],
  dishOptions: []
})

export function useAppContext(): IAppContext {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider')
  }
  return context
}
