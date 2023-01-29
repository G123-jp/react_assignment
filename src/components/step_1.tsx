import { SingleDish, orderInfoType } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
    // onClick: (event: React.MouseEvent<HTMLInputElement>) => void
    // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Step_1: React.FC<Props>= ({ dishesData,setDishesData, orderInfo, setOrderInfo }) => {

    let updateCategory = (e:any) => {
        //setOrderHolder([])
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
        <div>
        <div>
          <div>
            <label>
              <h3>Please Select a meal</h3>
              <select value={orderInfo.category} onChange={updateCategory}>
                <option value=''>---</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </label>
            <div>
              <h3>Please enter number of people</h3>
              <input type="number" min="1" max="10" value={orderInfo.numOfPeople} onChange={updatePeopleNum}>
              </input>
            </div>
          </div>
        </div>
      </div>
    )
};

export default Step_1