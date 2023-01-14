export type MenuItem = {
    id: string;
    name: string;
    restaurant: string;
    availableMeals: string[];
}

export type ReviewObject = {
    orderId: string;
    mealType: string;
    numberOfPeople: string;
    restaurant: string;
    orders: Orders[];
}

export type Orders = {
    name: string;
    numberOfServings: number;
}