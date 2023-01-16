import { useMemo } from 'react'

import { DEFAULT_ITEM } from './../constants/index'

import { DishJsonItem, Order } from '@/types'

interface Props {
  order: Order
  dishData: DishJsonItem[]
}

export interface OptionItem {
  value: string
  label: string
}

const DEFAULT_OPTIONS = [DEFAULT_ITEM]

export const useOptions = ({ order, dishData }: Props) => {
  const mealOptions: OptionItem[] = useMemo(() => {
    if (!dishData.length) return DEFAULT_OPTIONS
    return Array.from(new Set(dishData.map(d => d.availableMeals).flat())).map(d => ({
      label: d,
      value: d
    }))
  }, [dishData])

  const restaurantOptions: OptionItem[] = useMemo(() => {
    if (!order.meal) return DEFAULT_OPTIONS
    return Array.from(
      new Set(
        dishData
          .filter(d => d.availableMeals.includes(order.meal))
          .map(d => d.restaurant)
          .flat()
      )
    ).map(d => ({
      label: d,
      value: d
    }))
  }, [order, dishData])

  const dishOptions = useMemo(() => {
    if (!order.restaurant) return DEFAULT_OPTIONS
    return Array.from(
      new Set(
        dishData
          .filter(d => d.availableMeals.includes(order.meal) && d.restaurant === order.restaurant)
          .map(d => d.name)
          .flat()
      )
    ).map(d => ({ label: d, value: d }))
  }, [order, dishData])

  return {
    mealOptions,
    restaurantOptions,
    dishOptions
  }
}
