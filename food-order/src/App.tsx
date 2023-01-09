import React, { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import { OrderStep1 } from './components/step1';
import { OrderStep2 } from './components/step2';
import { OrderStep3 } from './components/step3';
import dishJson from './assets/dishes.json';
import { OrderContext, OrderFood, OrderFoodType } from './store';

function App() {
    const dataSource = dishJson.dishes;
    const pageNumRef = useRef(0);
    console.log('App render pageNum = ', pageNumRef.current);

    const [page1AnimateNameState, setPage1AnimateNameState] = useState('');
    const [page2AnimateNameState, setPage2AnimateNameState] = useState('');

    const [mealTypeState, setMealTypeState] = useState<OrderFoodType>('breakfast');
    const [numberOfPeopleState, setNumberOfPeopleState] = useState(1);
    const updateNumOfPeopleCallback = useCallback((value: number) => {
        setNumberOfPeopleState(value);
    }, []);
    const restaurants = useMemo(() => {
        const mutiRestaurants = dataSource
            .filter((element) => {
                return element.availableMeals.includes(mealTypeState);
            })
            .map((value) => {
                return value.restaurant;
            });
        return [...new Set(mutiRestaurants)];
    }, [mealTypeState]);
    const [restaurantState, setRestaurantState] = useState('');
    const dishes = useMemo(() => {
        return dataSource.filter((element) => {
            return element.availableMeals.includes(mealTypeState) && element.restaurant === restaurantState;
        });
    }, [mealTypeState, restaurantState]);

    const orderDishesRef = useRef<number[]>([]);

    const onNextCallback = useCallback(() => {
        const currentPage = pageNumRef.current;
        if (currentPage < 2) {
            pageNumRef.current = currentPage + 1;
        }

        if (currentPage === 0) {
            setPage1AnimateNameState(' page1-fadeOut');
            return;
        }
        if (currentPage === 1) {
            setPage2AnimateNameState(' page2-fadeOut');
            return;
        }
    }, []);

    const mealTypeCallback = useCallback((type: OrderFoodType) => {
        setMealTypeState(type);
    }, []);
    const onPreviousCallback = useCallback(() => {
        console.log('onPreviousCallback pageNum : ', pageNumRef.current);
        const currentPage = pageNumRef.current;
        if (currentPage > 0) {
            pageNumRef.current = currentPage - 1;
        }
        if (currentPage === 1) {
            console.log('onPreviousCallback setPage1AnimateNameState : ');
            setPage1AnimateNameState(' page1-fadeIn');
            return;
        }
        if (currentPage === 2) {
            setPage2AnimateNameState(' page2-fadeIn');
            return;
        }
    }, []);
    const restaurantCallback = useCallback((restaurant: string) => {
        setRestaurantState(restaurant);
    }, []);

    const contextInitValue: OrderFood = {
        updateContextMealType: mealTypeCallback,
        updateContextNumOfPeople: updateNumOfPeopleCallback,
        updateContextRestaurant: restaurantCallback,
        onClickNext: onNextCallback,
        onClickPrevious: onPreviousCallback,
        contextMealType: mealTypeState,
        contextNumOfPeople: numberOfPeopleState,
        contextRestaurant: restaurantState,
        contextDishIDs: orderDishesRef.current,
    };

    return (
        <OrderContext.Provider value={contextInitValue}>
            <div className="App">
                <OrderStep1 animateName={page1AnimateNameState}></OrderStep1>
                <OrderStep2 restaurants={restaurants} animateName={page2AnimateNameState}></OrderStep2>
                <OrderStep3 dishes={dishes}></OrderStep3>
            </div>
        </OrderContext.Provider>
    );
}

export default App;
