import { SelectedDishes } from "./types";

export const parseIntWithFallback = (str: string, radix: number, fallback: number) => {
    const value = Number.parseInt(str, radix);
    return Number.isNaN(value) ? fallback : value;
};

export const countTotalNumberOfServings = (selectedDishes: SelectedDishes) => {
    return Object.values(selectedDishes).reduce(
        (prevValue, { numberOfServing }) => {
          return prevValue + numberOfServing;
        },
        0
      );;
}