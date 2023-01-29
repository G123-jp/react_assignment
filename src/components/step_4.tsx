import { SingleDish, orderInfoType, SingleMeal } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
    orderHolder: SingleMeal[]
    setOrderHolder: any
}

const Step_4: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo, orderHolder, setOrderHolder }) => {

    let itemCreate = orderHolder.map((item)=>{
        return (
        <div>
            <div id="item-row" className="flex py-1">
                <div className="w-3/4 justify-center pr-20">{item.dish}</div>
                <div className="inline pr-16">{item.amount}</div>
            </div>
        </div>)
        });

    return (
        <div>
            <div className="flex-1 w-full">
                <div className="flex justify-between w-full py-5">
                    <h3 className="px-10">Meal</h3>
                    <h3 className="px-10">{orderInfo.category}</h3>
                </div>
                <div className="flex justify-between w-full py-5">
                    <h3 className="px-10">Number of people</h3>
                    <h3 className="px-10">{orderInfo.numOfPeople}</h3>
                </div>
                <div className="flex justify-between w-full py-5">
                    <h3 className="px-10">Restaurant</h3>
                    <h3 className="px-10">{orderInfo.restaurant}</h3>
                </div>
            </div>
            <h3 className="underline pb-10">Review your order</h3>
            <div className="pb-5">
                {itemCreate}
            </div>
        </div>
    )
};

export default Step_4