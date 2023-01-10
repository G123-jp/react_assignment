import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { OrderContext } from '../../store';
import { DishItem, OrderedDishItem } from '../../store/model';
import Modal from 'react-modal';
import { OrderStep4 } from '../step4';

import './step3.css';
import dishJson from '../../assets/dishes.json';

Modal.setAppElement('#root');

interface IOrderStep3Props {
    dishes: DishItem[];
}

interface IOrderDishesNum {
    [index: string]: OrderedDishItem;
}

const caluImageIndex = (indexNumber: number) => {
    const imageNameIndex = (indexNumber % 8) + 1;
    return imageNameIndex;
};

export const OrderStep3 = (props: IOrderStep3Props) => {
    const { dishes } = props;
    const dataSource = dishJson.dishes;
    const [modalOpenState, setModalOpenState] = useState(false);
    const [orderNumState, setOrderNumState] = useState(0);

    const orderContext = useContext(OrderContext);
    const contextNumOfPeople = orderContext?.contextNumOfPeople || 0;
    const [showValidMessageState, setShowValidMessageState] = useState(false);
    const [showingAlertState, setShowingAlertState] = useState(false);
    const [initialOrderDishesState] = useState(() => {
        const initialOrderDishes: IOrderDishesNum = {};
        dataSource.forEach((value) => {
            const key = value.id;
            const imageNameIndex = caluImageIndex(key);
            initialOrderDishes[key] = { orderNum: 0, id: value.id, name: value.name, imageIndex: imageNameIndex };
        });
        return initialOrderDishes;
    });
    const [orderDishesState, setOrderDishesState] = useState<IOrderDishesNum>(initialOrderDishesState);

    const orderedDishes = useMemo(() => {
        const dishesArray = Object.values<OrderedDishItem>(orderDishesState);
        return dishesArray.filter((element) => {
            return element.orderNum > 0;
        });
    }, [orderDishesState]);
    console.log('orderedDishes !!!! : ', orderedDishes);

    const onClickUpdateNum = useCallback(
        (e: SyntheticEvent, index: number, isPlus: boolean) => {
            const orderDishCopy = { ...orderDishesState };
            const orderingDish = orderDishCopy[index];
            const newNum = orderingDish.orderNum + (isPlus ? 1 : -1);
            orderDishCopy[index] = { ...orderingDish, ...{ orderNum: Math.max(newNum, 0) } };
            setOrderNumState((pre) => {
                return pre + (isPlus ? 1 : -1);
            });
            setOrderDishesState(orderDishCopy);
        },
        [orderDishesState]
    );

    const onClickPrevious = useCallback(() => {
        orderContext?.onClickPrevious();
        setTimeout(() => {
            setOrderDishesState(initialOrderDishesState);
        }, 500);
    }, []);

    const onClickNext = useCallback(() => {
        console.log('currentDishNum :', orderNumState + ' contextNumOfPeople :', contextNumOfPeople);
        if (orderNumState < contextNumOfPeople) {
            if (!showingAlertState) {
                setShowingAlertState(true);
            }
            setShowValidMessageState(true);
            return;
        }
        setShowValidMessageState(false);
        setModalOpenState(true);
    }, [contextNumOfPeople, orderNumState, showingAlertState]);
    const invalidMessage = useMemo(() => {
        return ` Please order at least ${contextNumOfPeople} meals!`;
    }, [contextNumOfPeople]);

    const alertClassName = useMemo(() => {
        return `page3-next-invalid${showValidMessageState ? ' fadeInOut' : ''}`;
    }, [showValidMessageState]);

    const onRequestCloseCallback = useCallback(() => {
        setModalOpenState(false);
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setShowingAlertState(false);
            setShowValidMessageState(false);
        }, 5000);
        return () => {
            clearTimeout(timerId);
        };
    }, [showingAlertState]);
    console.log('root setModalOpenState : ', modalOpenState);
    return (
        <div className="page3-backgroud">
            <div className="page3 page3-flex page3-col-flex-center">
                <h1 className="page3-heading-title">Please select a dish</h1>
                <label className="page3-hint-title">食べ物を無駄にしない</label>
                <div className="page3-flex page3-row-flex-center page3-element-container">
                    {dishes.map((value) => {
                        const key = value.id;
                        const imageNameIndex = caluImageIndex(key);
                        const orderNum = orderDishesState[key].orderNum;
                        return (
                            <div key={key} className="page3-col-25">
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
            <div className={alertClassName}>
                <i className="fa-solid fa-circle-exclamation"></i>
                {invalidMessage}
            </div>
            <Modal
                isOpen={modalOpenState}
                onRequestClose={onRequestCloseCallback}
                className="page3-modal-content"
                overlayClassName="page3-modal-overlay"
            >
                <OrderStep4 orderDishes={orderedDishes} onCloseCallback={onRequestCloseCallback}></OrderStep4>
            </Modal>
        </div>
    );
};
