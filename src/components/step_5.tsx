import { useEffect } from "react";
import { SingleDish, orderInfoType, SingleMeal } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
    orderHolder: SingleMeal[]
    setOrderHolder: any
}

const Step_5: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo, orderHolder, setOrderHolder }) => {

    useEffect(()=>{
        let completeOrder = {
          category:orderInfo.category,
          numOfPeople:orderInfo.numOfPeople,
          restaurant:orderInfo.restaurant,
          meals:orderHolder
        };
        console.log(completeOrder)
    
        setOrderInfo({
          category:"",
          numOfPeople:1,
          restaurant:"",
          meals:[],
        })
    
      },[])

    return (
        <div>
            <h1 className="">Thank you for your order!</h1>
        </div>
    )
};

export default Step_5