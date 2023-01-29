import { SingleDish } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
}

const Step_1: React.FC<Props>= ({ dishesData,setDishesData }) => {


    return (
        <div>step 1 {dishesData[0].name}</div>
    )
};

export default Step_1