import React, { useCallback, useContext, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { OrderContext } from '../../store';
import { DishItem } from '../../store/model';

import './step3.css';
import { useState } from 'react';
import { useMemo } from 'react';

interface IOrderStep3Props {
    dishes: DishItem[];
}

type OrderItemType = Pick<DishItem, 'id' | 'name'> & { orderNum: number };

interface IOrderDishesNum {
    [index: string]: OrderItemType;
}

export const OrderStep3 = (props: IOrderStep3Props) => {
    const { dishes } = props;
    const orderContext = useContext(OrderContext);
    const contextNumOfPeople = orderContext?.contextNumOfPeople || 0;
    const [showValidMessageState, setShowValidMessageState] = useState(false);
    const [showingAlertState, setShowingAlertState] = useState(false);
    const [orderDishesState, setOrderDishesState] = useState<IOrderDishesNum>(() => {
        const initialOrderDishes: IOrderDishesNum = {};
        dishes.forEach((value) => {
            initialOrderDishes[`${value.id}`] = { orderNum: 0, id: value.id, name: value.name };
        });
        return initialOrderDishes;
    });

    const onClickUpdateNum = useCallback(
        (e: SyntheticEvent, index: number, isPlus: boolean) => {
            const orderDishCopy = { ...orderDishesState };
            const orderingDish = orderDishCopy[index];
            const newNum = orderingDish.orderNum + (isPlus ? 1 : -1);
            orderDishCopy[`${index}`] = { ...orderingDish, ...{ orderNum: Math.max(newNum, 0) } };
            setOrderDishesState(orderDishCopy);
        },
        [orderDishesState]
    );

    const onClickPrevious = useCallback(() => {
        orderContext && orderContext.onClickPrevious();
    }, []);

    const onClickNext = useCallback(() => {
        let currentDishNum = 0;
        Object.values<OrderItemType>(orderDishesState).forEach((element) => {
            currentDishNum += element.orderNum;
        });
        if (currentDishNum < contextNumOfPeople) {
            if (!showingAlertState) {
                setShowingAlertState(true);
            }
            setShowValidMessageState(true);
            return;
        }
        setShowValidMessageState(false);
        orderContext && orderContext.onClickNext();
    }, [contextNumOfPeople, orderDishesState, showingAlertState]);
    const invalidMessage = useMemo(() => {
        return `Please order at least ${contextNumOfPeople} meals!`;
    }, [contextNumOfPeople]);

    const alertClassName = useMemo(() => {
        return `page3-next-invalid${showValidMessageState ? ' fadeInOut' : ''}`;
    }, [showValidMessageState]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setShowingAlertState(false);
            setShowValidMessageState(false);
        }, 5000);
        return () => {
            clearTimeout(timerId);
        };
    }, [showingAlertState]);

    return (
        <div className="page3-backgroud">
            <div className="page3 page3-flex page3-col-flex-center">
                <h1 className="page3-heading-title">Please select a dish</h1>
                <label className="page3-hint-title">食べ物を無駄にしない</label>
                <div className="page3-flex page3-row-flex-center page3-element-container">
                    {dishes.map((value, index: number) => {
                        const imageNameIndex = (index % 8) + 1;
                        const orderNum = orderDishesState[`${value.id}`].orderNum;
                        return (
                            <div key={value.id} className="page3-col-25">
                                <img
                                    src={require('../../assets/' + imageNameIndex + '.png')}
                                    className="page3-col-25-inner-img"
                                />
                                <div className="page3-flex page3-col-flex-end page3-col-25-inner">
                                    <p className="page3-dish-item-title">{value.name}</p>
                                    <p className="page3-dish-item-subtitle">Mus Natoque Quisque Tincidunt</p>
                                    <div className="page3-flex page3-row-flex-between page3-dish-item-num-box">
                                        <label className="page3-dish-item-num">{`${orderNum}`}</label>
                                        <div className="page3-flex page3-row-flex-between page3-icon-button-box">
                                            <div
                                                className="page3-flex page3-icon-minus-button"
                                                onClick={(e) => {
                                                    onClickUpdateNum(e, value.id, false);
                                                }}
                                            >
                                                {' '}
                                                <i className="fa fa-minus"></i>
                                            </div>
                                            <div
                                                className="page3-flex page3-icon-button-normal"
                                                onClick={(e) => {
                                                    onClickUpdateNum(e, value.id, true);
                                                }}
                                            >
                                                {' '}
                                                <i className="fa fa-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="page3-button-next" onClick={onClickNext}>
                Next
            </div>
            <div className="page3-button-cancel" onClick={onClickPrevious}>
                Previous
            </div>
            <div className={alertClassName}>{invalidMessage}</div>
        </div>
    );
};
