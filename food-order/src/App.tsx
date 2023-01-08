import React, { useCallback, useMemo, useRef, useState } from 'react';
import './App.css';
import { OrderStep1 } from './components/step1';
import { OrderStep2 } from './components/step2';
import dishJson from './assets/dishes.json';
import { OrderContext, OrderFood, OrderFoodType } from './store';

function App() {
    const dataSource = dishJson.dishes;
    const [pageNum, setPageNum] = useState(0);
    const mealTypeRef = useRef<OrderFoodType>('breakfast');
    const numberOfPeopleRef = useRef(1);
    const updateNumOfPeopleCallback = useCallback((value: any) => {
        console.log('', value);
    }, []);
    const restaurants = useMemo(() => {
        const mutiRestaurants = dataSource
            .filter((element) => {
                console.log('element filter', mealTypeRef.current);
                return element.availableMeals.includes(mealTypeRef.current);
            })
            .map((value) => {
                console.log('restaurants map', value);
                return value.restaurant;
            });
        return [...new Set(mutiRestaurants)];
    }, [mealTypeRef.current]);
    console.log('restaurants =', restaurants);
    const restaurantRef = useRef('');

    // const dishes = useMemo(() => {
    //     return dataSource.filter((element) => {
    //         return element.availableMeals.includes(mealTypeRef.current) && element.restaurant === restaurantRef.current;
    //     });
    // }, [mealTypeRef.current]);

    const orderDishesRef = useRef<number[]>([]);

    const updateSelectedMealTypeCallback = useCallback((type: any) => {
        console.log('', type);
    }, []);

    const contextInitValue: OrderFood = {
        updateContextMealType: updateSelectedMealTypeCallback,
        updateContextNumOfPeople: updateNumOfPeopleCallback,
        updateContextRestaurant: (restaurant) => {
            console.log('', restaurant);
        },
        onClickNext: () => {
            setPageNum((pre) => pre + 1);
            console.log('');
        },
        onClickPrevious: () => {
            setPageNum((pre) => pre - 1);
            console.log('');
        },
        contextMealType: mealTypeRef.current,
        contextNumOfPeople: numberOfPeopleRef.current,
        contextRestaurant: restaurantRef.current,
        contextDishIDs: orderDishesRef.current,
    };
    const renderStep1 = pageNum === 0;
    const renderStep2 = pageNum === 1;
    // const renderStep3 = pageNum === 2;
    // const renderStep4 = pageNum === 3;

    return (
        <OrderContext.Provider value={contextInitValue}>
            <div className="App">
                {renderStep1 && <OrderStep1></OrderStep1>}
                {renderStep2 && <OrderStep2 restaurants={restaurants}></OrderStep2>}
                {/* {renderStep3 && <OrderStep1></OrderStep1>}
                {renderStep4 && <OrderStep1></OrderStep1>} */}
            </div>
        </OrderContext.Provider>
    );
}

export default App;
