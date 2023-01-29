import { SingleDish, orderInfoType } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
}

const Step_3: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo }) => {
    return (
        <div>step 3</div>
    )
};

export default Step_3