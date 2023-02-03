import { getRestaurantsByMeal, getAvailableDishByRestaurant, generateRandomID } from '../src/utils/index'
import { SelectMeal } from '../src/components/StepComponent'
import { dishes } from '../data/dishes.json'
import { render, screen, fireEvent } from '@testing-library/react'

/**
 * test getRestaurantsByMeal function with breakfast meal type
 */
describe('Test getRestaurantsByMeal function', () => {
  it('breakfast', () => {
    expect(getRestaurantsByMeal(dishes, 'breakfast')).toStrictEqual(['Mc Donalds', 'Vege Deli', 'Olive Garden'])
  })
})
/**
 * test getRestaurantsByMeal function with lunch meal type
 */
describe('Test getRestaurantsByMeal function', () => {
  it('lunch', () => {
    expect(getRestaurantsByMeal(dishes, 'lunch')).toStrictEqual(['Mc Donalds', 'Taco Bell', 'Vege Deli', 'Pizzeria', 'Panda Express', 'Olive Garden'])
  })
})
/**
 * test getRestaurantsByMeal function with dinner meal type
 */
describe('Test getRestaurantsByMeal function', () => {
  it('dinner', () => {
    expect(getRestaurantsByMeal(dishes, 'dinner')).toStrictEqual([
      'Mc Donalds',
      'Taco Bell',
      'BBQ Hut',
      'Vege Deli',
      'Pizzeria',
      'Panda Express',
      'Olive Garden',
    ])
  })
})
/**
 * test getAvailableDishByRestaurant function with Mc Donalds restaurant and breakfast meal type
 */
describe('Test getAvailableDishByRestaurant function', () => {
  it('Mc Donalds', () => {
    expect(getAvailableDishByRestaurant(dishes, 'breakfast', 'Mc Donalds')).toStrictEqual(['Egg Muffin'])
  })
})

/**
 * test getAvailableDishByRestaurant function with Taco Bell restaurant and lunch meal type
 */
describe('Test getAvailableDishByRestaurant function', () => {
  it('Taco Bell', () => {
    expect(getAvailableDishByRestaurant(dishes, 'lunch', 'Taco Bell')).toStrictEqual(['Burrito', 'Tacos', 'Quesadilla'])
  })
})
/**
 * test getAvailableDishByRestaurant function with Olive Garden restaurant and dinner meal type
 */
describe('Test getAvailableDishByRestaurant function', () => {
  it('Olive Garden', () => {
    expect(getAvailableDishByRestaurant(dishes, 'dinner', 'Olive Garden')).toStrictEqual(['Garlic Bread', 'Ravioli', 'Rigatoni Spaghetti', 'Fettucine Pasta'])
  })
})
/**
 * test generateRandomID function result is string
 */
describe('Test generateRandomID function', () => {
  it('is string', () => {
    expect(typeof generateRandomID()).toBe('string')
  })
})
/**
 * test generateRandomID function result is 8 characters
 */
describe('Test generateRandomID function', () => {
  it('random ID', () => {
    expect(generateRandomID()).toHaveLength(8)
  })
})
