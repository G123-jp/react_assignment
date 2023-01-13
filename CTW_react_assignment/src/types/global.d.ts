export type MenuItem = {
    id: number;
    name: string;
    restaurant: string;
    availableMeals: string[];
}

export type ReviewObject = {
    orderId: number;
    timeOrdered: string;
    mealType: string;
    numberOfPeople: string;
    restaurant: string;
    orders: Orders[];
}

export type Orders = {
    menuItemId: number;
    name: string;
    numberOfServings: number;
}