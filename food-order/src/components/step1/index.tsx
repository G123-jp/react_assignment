import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { SyntheticEvent, ChangeEventHandler } from 'react';
import './step1.css';
import breakFirst from '../../assets/dumpling.png';
import lunch from '../../assets/curry.png';
import dinner from '../../assets/salad.png';

export const OrderStep1 = () => {
    const [currentSelectedMeal, setCurrentSelectedMeal] = useState('breakfast');
    const numOfPeopleRef = useRef('1');
    const mealClassNames = useMemo(() => {
        const className = 'elementor-flex elementor-box-wrapper elementor-box-item';
        const selectClassName = ' elementor-box-item-selected';
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
        console.log('click');
    }, []);

    return (
        <div className="page elementor-element">
            <h1 className="elementor-heading-title">ORDER FOOD</h1>
            <h3 className="elementor-hint-title">Please select a meal</h3>
            <div className="elementor-flex elementor-row-flex-center elementor-element-container">
                <div className={mealClassNames[0]} onClick={(e) => onClickMeal(e, 'breakfast')}>
                    <img src={breakFirst}></img>
                    <p>Breakfirst</p>
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
            <h3 className="elementor-hint-title">Please enter number of people</h3>
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
            <div className="elementor-button-normal elementor-flex elementor-right-button" onClick={onClickNext}>
                Next
            </div>
        </div>
    );
};
