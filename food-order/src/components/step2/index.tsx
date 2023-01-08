import React, { useCallback, useContext, useRef } from 'react';
import type { ChangeEventHandler } from 'react';
import { OrderContext } from '../../store';

import './step2.css';
import leftsalad from '../../assets/leftsalad.png';

interface IOrderStepProps {
    restaurants: string[];
}

export const OrderStep2 = (props: IOrderStepProps) => {
    const { restaurants } = props;
    const orderContext = useContext(OrderContext);
    const selectRestaurantRef = useRef(restaurants[0]);
    const onClickPrevious = useCallback(() => {
        orderContext && orderContext.onClickPrevious();
    }, []);

    const onNuOfPeopleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((value) => {
        selectRestaurantRef.current = value.target.value;
    }, []);

    const onClickNext = useCallback(() => {
        orderContext && orderContext.onClickNext();
    }, []);

    return (
        <div className="page page2-flex page2-row-flex-center">
            <div className="page2-flex page2-col-flex-center page2-col-30">
                <h1 className="page2-heading-title">Online Reservation</h1>
                <img src={leftsalad} width={620} height={543} alt="" />
            </div>
            <div className="page2-flex page2-col-start-start page2-col-30 page2-col-right">
                <div className="page2-flex page2-col-start-start">
                    <label className="page2-right-form-label">
                        Please select a meal<small className="page2-right-form-required">*</small>
                    </label>
                    <select
                        className="select"
                        required={true}
                        aria-required="true"
                        defaultValue={selectRestaurantRef.current}
                        onChange={onNuOfPeopleChange}
                    >
                        {restaurants.map((value: string, index: number) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="page2-flex page2-right-form-button-box">
                    <div className="page2-flex page2-button-normal" onClick={onClickNext}>
                        Next
                    </div>
                    <div className="page2-flex page2-right-form-button-cancel" onClick={onClickPrevious}>
                        Previous
                    </div>
                </div>
            </div>
        </div>
    );
};
