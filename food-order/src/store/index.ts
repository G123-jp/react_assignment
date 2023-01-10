import React from 'react';

export type OrderFoodType = 'breakfast' | 'lunch' | 'dinner';

export interface OrderFood {
    updateContextMealType: (type: OrderFoodType) => void;
    updateContextRestaurant: (restaurant: string) => void;
    updateContextNumOfPeople: (value: number) => void;
    onClickNext: () => void;
    onClickPrevious: () => void;
    contextMealType: OrderFoodType;
    contextRestaurant: string;
    contextNumOfPeople: number;
    contextDishIDs: number[];
}

export const OrderContext = React.createContext<OrderFood | null>(null);
