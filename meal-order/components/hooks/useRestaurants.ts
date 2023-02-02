import { MealType } from "@/common/types";
import { RestaurantList } from "@/pages/api/restaurants";
import { useEffect, useState } from "react";

export const useRestaurants = (mealType: MealType | null) => {
    const [data, setData] = useState<RestaurantList | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/restaurants?mealType=${mealType || ""}`)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        });
    }, [mealType]);

    return {
        restaurants: data ? data.restaurants : [],
        isLoading,
    };
};