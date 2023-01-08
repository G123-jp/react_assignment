import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import './step2.css';
import leftsalad from '../../assets/leftsalad.png';

export const OrderStep3 = () => {
    const restaurants = ['Taco Bell', 'Mc mo', 'BBQ'];
    const selectRestaurantRef = useRef(restaurants[0]);

    const onClickPrevious = useCallback(() => {
        console.log('click');
    }, []);

    const onNuOfPeopleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((value) => {
        selectRestaurantRef.current = value.target.value;
    }, []);

    const onClickNext = useCallback(() => {
        console.log('click');
    }, []);

    return (
        <div className="page elementor-flex elementor-row-flex-center">
            <div className="elementor-flex elementor-col-flex-center elementor-col-30">
                <h1 className="elementor-heading-title">Online Reservation</h1>
                <img src={leftsalad} width={620} height={543} alt="" />
            </div>
            <div className="elementor-flex elementor-col-start-start elementor-col-30 elementor-col-right">
                <div className="elementor-flex elementor-col-start-start">
                    <label className="elementor-right-form-label">
                        Please select a meal<small className="elementor-right-form-required">*</small>
                    </label>
                    <select
                        className="select"
                        required={true}
                        aria-required="true"
                        defaultValue={selectRestaurantRef.current}
                        onChange={onNuOfPeopleChange}
                    >
                        {restaurants.map((value, index: number) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="elementor-flex elementor-right-form-button-box">
                    <div className="elementor-flex elementor-button-normal" onClick={onClickNext}>
                        Next
                    </div>
                    <div className="elementor-flex elementor-right-form-button-cancel" onClick={onClickPrevious}>
                        Previous
                    </div>
                </div>
            </div>
        </div>
    );
};
