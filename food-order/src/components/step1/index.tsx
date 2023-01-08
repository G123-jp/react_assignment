import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { SyntheticEvent, ChangeEventHandler } from 'react';
import { OrderContext } from '../../store';
import './step1.css';
import breakfast from '../../assets/dumpling.png';
import lunch from '../../assets/curry.png';
import dinner from '../../assets/salad.png';

export const OrderStep1 = () => {
    const [currentSelectedMeal, setCurrentSelectedMeal] = useState('breakfast');
    const orderContext = useContext(OrderContext);
    const numOfPeopleRef = useRef('1');
    const mealClassNames = useMemo(() => {
        const className = 'page1-flex page1-box-wrapper page1-box-item';
        const selectClassName = ' page1-box-item-selected';
        const firstClassName = className + (currentSelectedMeal === 'breakfast' ? selectClassName : '');
        const secondClassName = className + (currentSelectedMeal === 'lunch' ? selectClassName : '');
        const thirdClassName = className + (currentSelectedMeal === 'dinner' ? selectClassName : '');
        return [firstClassName, secondClassName, thirdClassName];
    }, [currentSelectedMeal]);
    const onClickMeal = useCallback((e: SyntheticEvent, index: string) => {
        console.log('event target = ', e + 'index ', index);
        setCurrentSelectedMeal(index);
    }, []);

    const onNuOfPeopleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((value) => {
        numOfPeopleRef.current = value.target.value;
    }, []);

    const onClickNext = useCallback(() => {
        orderContext && orderContext.onClickNext();
    }, []);

    return (
        <div className="page page1-element">
            <h1 className="page1-heading-title">ORDER FOOD</h1>
            <h3 className="page1-hint-title">Please select a meal</h3>
            <div className="page1-flex page1-row-flex-center page1-element-container">
                <div className={mealClassNames[0]} onClick={(e) => onClickMeal(e, 'breakfast')}>
                    <img src={breakfast}></img>
                    <p>Breakfast</p>
                </div>
                <div className={mealClassNames[1]} onClick={(e) => onClickMeal(e, 'lunch')}>
                    <img src={lunch}></img>
                    <p>Lunch</p>
                </div>
                <div className={mealClassNames[2]} onClick={(e) => onClickMeal(e, 'dinner')}>
                    <img src={dinner}></img>
                    <p>Dinner</p>
                </div>
            </div>
            <h3 className="page1-hint-title">Please enter number of people</h3>
            <select
                className="select"
                required={true}
                aria-required="true"
                defaultValue={numOfPeopleRef.current}
                onChange={onNuOfPeopleChange}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <div className="page1-button-normal page1-flex page1-right-button" onClick={onClickNext}>
                Next
            </div>
        </div>
    );
};
