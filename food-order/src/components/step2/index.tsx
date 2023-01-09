import React, { useCallback, useContext, useRef } from 'react';
import type { ChangeEventHandler } from 'react';
import { OrderContext } from '../../store';

import './step2.css';
import leftsalad from '../../assets/leftsalad.png';

interface IOrderStepProps {
    restaurants: string[];
    animateName: string;
}

export const OrderStep2 = (props: IOrderStepProps) => {
    const { restaurants, animateName } = props;
    const page2ClassName = 'page2 page2-flex page2-row-flex-center' + animateName;
    console.log('page2ClassName ', page2ClassName);
    const orderContext = useContext(OrderContext);
    const selectRestaurant = restaurants[0];
    const selectRestaurantRef = useRef(selectRestaurant);
    const onClickPrevious = useCallback(() => {
        orderContext && orderContext.onClickPrevious();
    }, []);

    const onChangeRestaurant = useCallback<ChangeEventHandler<HTMLSelectElement>>((value) => {
        selectRestaurantRef.current = value.target.value;
    }, []);

    const onClickNext = useCallback(() => {
        orderContext?.updateContextRestaurant(selectRestaurantRef.current);
        orderContext && orderContext.onClickNext();
    }, []);

    return (
        <div className={page2ClassName}>
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
                        className="page2-select"
                        required={true}
                        aria-required="true"
                        defaultValue={selectRestaurant}
                        onChange={onChangeRestaurant}
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
