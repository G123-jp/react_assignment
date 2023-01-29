import { SingleDish, orderInfoType, SingleMeal} from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
    orderHolder: SingleMeal[]
    setOrderHolder: any
}

const Step_2: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo, orderHolder, setOrderHolder  }) => {

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
        setOrderHolder([]);
        setOrderInfo({
          category: orderInfo.category,
          numOfPeople: orderInfo.numOfPeople,
          restaurant:e.target.value,
          meals:[],
        });
      };

    return (
        <div>
            <div className="inline-flex">
                <label>
                    <h3>Please Select a Resturant that offers {orderInfo.category}</h3>
                    <select value={orderInfo.restaurant} onChange={changeHandler} className="appearance-none w-3/4 inline bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value = "">---</option>
                        {mappedRestaurants}
                    </select>
                </label>
            </div>
        </div>
    )
};

export default Step_2