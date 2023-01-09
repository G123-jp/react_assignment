import React, { useCallback, useContext, useRef } from 'react';
import type { ChangeEventHandler } from 'react';
import { OrderContext } from '../../store';

import './step4.css';

export const OrderStep4 = () => {
    const orderContext = useContext(OrderContext);
    const onClickPrevious = useCallback(() => {
        orderContext && orderContext.onClickPrevious();
    }, []);

    const onClickNext = useCallback(() => {
        orderContext && orderContext.onClickNext();
    }, []);

    return (
        <div className="page4-backgroud">
            <div className="page4">
                <i className="fa-solid fa-xmark"></i>
                <h1 className="page4-heading-title">Please check your order</h1>
                <ul>
                    <li>
                        <p>Meal</p>
                        <p>Launch</p>
                    </li>
                    <li>
                        <p>No. of. people</p>
                        <p>3</p>
                    </li>
                    <li>
                        <p>Restaurant</p>
                        <p>Mc mod</p>
                    </li>
                </ul>
                <div>
                    <p>Dishes</p>
                    <ul>
                        <li>
                            <p>菜品名字</p>
                            <p>数量</p>
                        </li>
                    </ul>
                </div>
                <button className="page4-button-normal">Order Now</button>
            </div>
        </div>
    );
};
