export type MealType = "breakfast" | "lunch" | "dinner";

export type Dish = {
    id: number,
    name: string,
    restaurant: string, 
    availableMeals: [],
};