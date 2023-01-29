import { SingleDish, orderInfoType, SingleMeal } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
    orderHolder: SingleMeal[]
    setOrderHolder: any
}

const Step_1: React.FC<Props>= ({ dishesData,setDishesData, orderInfo, setOrderInfo, orderHolder, setOrderHolder }) => {

    let updateCategory = (e:any) => {
        setOrderHolder([])
        setOrderInfo({
          category:e.target.value,
          numOfPeople: orderInfo.numOfPeople,
          restaurant:"",
          meals:[],
        });
      };

      let updatePeopleNum = (e:any) => {
        setOrderInfo({
          category: orderInfo.category,
          numOfPeople:e.target.value,
          restaurant:"",
          meals:[],
        });
      };

    return (
        <div className="flex justify-center">
        <div>
            <label>
              <h3>Please Select a meal</h3>
              <select value={orderInfo.category} onChange={updateCategory} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option value=''>---</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </label>
            <div>
              <h3>Please enter number of people</h3>
              <input type="number" min="1" max="10" value={orderInfo.numOfPeople} onChange={updatePeopleNum} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              </input>
            </div>
        </div>
      </div>
    )
};

export default Step_1