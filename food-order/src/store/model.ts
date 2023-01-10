export interface DishItem {
    id: number;
    name: string;
    restaurant: string;
    availableMeals: string[];
}

// export type OrderItemType = Pick<DishItem, 'id' | 'name'> & { orderNum: number };

export interface OrderedDishItem {
    id: number;
    name: string;
    orderNum: number;
    imageIndex: number;
}
