import { SingleDish, orderInfoType } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
}

const Step_4: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo }) => {
    return (
        <div>step 4</div>
    )
};

export default Step_4