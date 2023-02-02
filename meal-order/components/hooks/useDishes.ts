import { MealType } from "@/common/types";
import { DishList } from "@/pages/api/dishes";
import { useEffect, useState } from "react";

export const useDishes = (mealType: MealType | null, restaurant: string) => {
    const [data, setData] = useState<DishList | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/dishes?mealType=${mealType || ""}&restaurant=${restaurant}`)
        .then((res) => res.json()) 
        .then((data) => {
            setData(data);
            setLoading(false);
        });
    }, [mealType, restaurant]);

    return {
        dishes: data ? data.dishes : [],
        isLoading,
    };
};