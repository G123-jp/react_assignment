import React, { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import { OrderStep1 } from './components/step1';
import { OrderStep2 } from './components/step2';
import { OrderStep3 } from './components/step3';
import dishJson from './assets/dishes.json';
import { OrderContext, OrderFood, OrderFoodType } from './store';

function App() {
    const dataSource = dishJson.dishes;
    console.log('App render');
    const [pageNum, setPageNum] = useState(0);
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
    console.log('restaurants =', restaurants);
    const [restaurantState, setRestaurantState] = useState('');
    console.log('current mealtype state : ', mealTypeState + ' restu : ', restaurantState);
    const dishes = useMemo(() => {
        return dataSource.filter((element) => {
            return element.availableMeals.includes(mealTypeState) && element.restaurant === restaurantState;
        });
    }, [mealTypeState, restaurantState]);
    console.log('dishes : ', dishes);

    const orderDishesRef = useRef<number[]>([]);

    const contextInitValue: OrderFood = {
        updateContextMealType: (type: OrderFoodType) => {
            setMealTypeState(type);
        },
        updateContextNumOfPeople: updateNumOfPeopleCallback,
        updateContextRestaurant: (restaurant) => {
            setRestaurantState(restaurant);
        },
        onClickNext: () => {
            setPageNum((pre) => pre + 1);
            console.log('');
        },
        onClickPrevious: () => {
            setPageNum((pre) => pre - 1);
            console.log('');
        },
        contextMealType: mealTypeState,
        contextNumOfPeople: numberOfPeopleState,
        contextRestaurant: restaurantState,
        contextDishIDs: orderDishesRef.current,
    };
    const renderStep1 = pageNum === 0;
    const renderStep2 = pageNum === 1;
    const renderStep3 = pageNum === 2;
    // const renderStep4 = pageNum === 3;

    return (
        <OrderContext.Provider value={contextInitValue}>
            <div className="App">
                {renderStep1 && <OrderStep1></OrderStep1>}
                {renderStep2 && <OrderStep2 restaurants={restaurants}></OrderStep2>}
                {renderStep3 && <OrderStep3 dishes={dishes}></OrderStep3>}
                {/* {renderStep4 && <OrderStep1></OrderStep1>} */}
            </div>
        </OrderContext.Provider>
    );
}

export default App;
