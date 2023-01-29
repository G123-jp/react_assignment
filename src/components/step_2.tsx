import { SingleDish, orderInfoType } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
}

const Step_2: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo }) => {

    let filterRestaurants = dishesData.filter((dish)=>{
        for(let meals of dish.availableMeals){
          if(meals === orderInfo.category){
            return true
          };
        };
      });
    
    let restaurantArray = [...new Set(filterRestaurants.map((r)=>{return r.restaurant}))];

    let mappedRestaurants = restaurantArray.map((r) => {
        return <option key={r} value={r}>{r}</option>
      });

    let changeHandler = (e:any) => {
        //setOrderHolder([]);
        setOrderInfo({
          category: orderInfo.category,
          numOfPeople: orderInfo.numOfPeople,
          restaurant:e.target.value,
          meals:[],
        });
      };

    return (
        <div>
            <div>
                <label>
                    <h3>Please Select a Resturant that offers {orderInfo.category}</h3>
                    <h2>{orderInfo.restaurant} has been chosen</h2>
                    <select value={orderInfo.restaurant} onChange={changeHandler}>
                        <option value = "">---</option>
                        {mappedRestaurants}
                    </select>
                </label>
            </div>
        </div>
    )
};

export default Step_2