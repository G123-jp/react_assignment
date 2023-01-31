export type MealType = "breakfast" | "lunch" | "dinner";

export type Dish = {
    id: number,
    name: string,
    restaurant: string, 
    availableMeals: [],
};

type DishServing = { dish: Dish; numberOfServing: number };
export type SelectedDishes = { [id: string]: DishServing };

export interface StateType {
    selectedMealType: MealType;
    numOfPeople: number;
    selectedRestaurant: string;
    selectedDishes: SelectedDishes; // dish id mapping to Dish Serving
};