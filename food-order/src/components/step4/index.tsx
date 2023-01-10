import React, { useCallback, useContext, useRef } from 'react';
import { OrderContext } from '../../store';
import { OrderedDishItem } from '../../store/model';

import './step4.css';

interface IOrderStep4Props {
    orderDishes: OrderedDishItem[];
    onCloseCallback: () => void;
}

export const OrderStep4 = (props: IOrderStep4Props) => {
    const { orderDishes, onCloseCallback } = props;
    const orderContext = useContext(OrderContext);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const onCloseClick = useCallback(() => {
        onCloseCallback();
    }, [onCloseCallback]);

    const onClickButton = useCallback(() => {
        const button = buttonRef.current;
        button?.classList.remove('animate');

        button?.classList.add('animate');
        button?.classList.add('animate');
        setTimeout(function () {
            button?.classList.remove('animate');
        }, 6000);
    }, []);

    return (
        <div className="page4-backgroud">
            <div className="page4">
                <div className="page4-left-box">
                    <img
                        src={require('../../assets/' + orderDishes[0].imageIndex + '.png')}
                        className="page4-left-dish-img"
                    />
                </div>
                <div className="page4-order-box">
                    <div className="page4-close-box" onClick={onCloseClick}>
                        {' '}
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <h1 className="page4-heading-title">Please check your order</h1>
                    <ul className="page4-form">
                        <li className="page4-form-li page4-form-li-row">
                            <p className="page4-form-li-row-title">Meal</p>
                            <p className="page4-form-li-row-content">{orderContext?.contextMealType}</p>
                        </li>
                        <li className="page4-form-li page4-form-li-row">
                            <p className="page4-form-li-row-title">No. of. people</p>
                            <p className="page4-form-li-row-content">{orderContext?.contextNumOfPeople}</p>
                        </li>
                        <li className="page4-form-li page4-form-li-row">
                            <p className="page4-form-li-row-title">Restaurant</p>
                            <p className="page4-form-li-row-content">{orderContext?.contextRestaurant}</p>
                        </li>
                    </ul>
                    <div className="page4-dishes-box">
                        <p className="page4-form-li-row-title">Dishes</p>
                        <div className="page4-dish-preview-box">
                            {orderDishes.map((value) => {
                                return (
                                    <div key={value.id} className="page4-form-li page4-dish-preview-item">
                                        <p className="page4-dish-preview-title">{value.name}</p>
                                        <p className="page4-dish-preview-subtitle">{`x ${value.orderNum}`}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button ref={buttonRef} onClick={onClickButton} className="page4-button-normal success">
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};
