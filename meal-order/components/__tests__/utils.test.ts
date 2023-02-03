import { Dish } from '@/common/types';
import { reducer, StateType, STEPS } from '../utils';

const mockDish: Dish = {
  id: 1,
  name: 'Chicken Burger',
  restaurant: 'Mc Donalds',
  availableMeals: ['lunch', 'dinner'],
};

const anotherMockDish: Dish = {
  id: 2,
  name: 'Ham Burger',
  restaurant: 'Mc Donalds',
  availableMeals: ['lunch', 'dinner'],
};

describe('Reducer', () => {
  const defaultState: StateType = {
    selectedMealType: 'breakfast',
    numOfPeople: 3,
    selectedRestaurant: 'Mc Donalds',
    selectedDishes: {},
    currentStep: STEPS.Step1,
    formValidity: { isFormValid: true },
  };
  describe('action: go to prev step', () => {
    it('go to previous step when current step is not Step1', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step2,
        },
        { type: 'go_to_prev_step' }
      );
      expect(newState.currentStep).toEqual(STEPS.Step1);
    });
    it('should not go to previous step when current step is Step1', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step1,
        },
        { type: 'go_to_prev_step' }
      );
      expect(newState.currentStep).toEqual(STEPS.Step1);
    });
    it('should not include error message when going to prev step with invalid state', () => {
      const newState = reducer(
        {
          ...defaultState,
          selectedMealType: null,
          currentStep: STEPS.Step2,
        },
        { type: 'go_to_prev_step' }
      );
      expect(newState.currentStep).toEqual(STEPS.Step1);
      expect(newState.formValidity.isFormValid).toEqual(false);
      expect(newState.formValidity.errorMessage).not.toBeTruthy();
    });
  });

  describe('action: go to next step', () => {
    it('go to next step when current step is not Review step', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step2,
        },
        { type: 'go_to_next_step' }
      );
      expect(newState.currentStep).toEqual(STEPS.Step3);
    });
    it('should not go to next step when current step is Submit Order step', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.SubmitOrder,
        },
        { type: 'go_to_next_step' }
      );
      expect(newState.currentStep).toEqual(STEPS.SubmitOrder);
    });
    it('should not include error message when going to next step with invalid state', () => {
      const newState = reducer(
        {
          ...defaultState,
          selectedRestaurant: '',
          currentStep: STEPS.Step1,
        },
        { type: 'go_to_next_step' }
      );
      expect(newState.currentStep).toEqual(STEPS.Step2);
      expect(newState.formValidity.isFormValid).toEqual(false);
      expect(newState.formValidity.errorMessage).not.toBeTruthy();
    });
  });

  describe('action: select meal type', () => {
    it('should update selected meal type, reset selected restaurant, and reset selected dishes', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step1,
          selectedMealType: null,
          selectedRestaurant: 'Mc Donalds',
          selectedDishes: { '1': { dish: mockDish, numberOfServing: 1 } },
        },
        { type: 'select_meal_type', payload: { mealType: 'lunch' } }
      );

      expect(newState.selectedMealType).toEqual('lunch');
      expect(newState.selectedRestaurant).toEqual('');
      expect(newState.selectedDishes).toEqual({});
      expect(newState.formValidity.isFormValid).toEqual(true);
    });
  });

  describe('action: select number of people', () => {
    it('should update number of people', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step1,
          numOfPeople: 1,
        },
        { type: 'select_num_people', payload: { numOfPeople: 5 } }
      );

      expect(newState.numOfPeople).toEqual(5);
    });
    it('should set form validity to false and set error message when selecting number of people out of range', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step1,
          numOfPeople: 10,
        },
        { type: 'select_num_people', payload: { numOfPeople: 11 } }
      );

      expect(newState.numOfPeople).toEqual(11);
      expect(newState.formValidity.isFormValid).toBe(false);
      expect(newState.formValidity.errorMessage).toBeTruthy();
    });
  });

  describe('action: select a restaurant', () => {
    it('should update the selected restaurant', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step2,
          selectedRestaurant: 'Mc Donalds',
        },
        { type: 'select_restaurant', payload: { restaurant: 'Olive Garden' } }
      );

      expect(newState.selectedRestaurant).toEqual('Olive Garden');
    });
    it('should set form validity to false and set error message when no restaurant is selected', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step2,
          selectedRestaurant: 'Mc Donalds',
        },
        { type: 'select_restaurant', payload: { restaurant: '' } }
      );

      expect(newState.selectedRestaurant).toEqual('');
      expect(newState.formValidity.isFormValid).toBe(false);
      expect(newState.formValidity.errorMessage).toBeTruthy();
    });
  });

  describe('action: updating dish order', () => {
    it('should update the number of serving for the modified dish', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step3,
          selectedDishes: { '1': { dish: mockDish, numberOfServing: 2 } },
        },
        {
          type: 'update_dish_order',
          payload: { dish: mockDish, numberOfServing: 3 },
        }
      );

      expect(newState.selectedDishes['1'].numberOfServing).toEqual(3);
    });
    it('should set form validity to false when total number of servings is less than number of people', () => {
      const newState = reducer(
        {
          ...defaultState,
          currentStep: STEPS.Step3,
          numOfPeople: 5,
          selectedDishes: {
            '1': { dish: mockDish, numberOfServing: 3 },
            '2': { dish: anotherMockDish, numberOfServing: 2 },
          },
        },
        {
          type: 'update_dish_order',
          payload: { dish: mockDish, numberOfServing: 2 },
        }
      );

      expect(newState.selectedDishes['1'].numberOfServing).toEqual(2);
      expect(newState.formValidity.isFormValid).toBe(false);
      expect(newState.formValidity.errorMessage).toBeTruthy();
    });
  });
});
