import { useState, useEffect } from "react";
import { SingleDish, orderInfoType, SingleMeal } from "../globals";

type Props = {
    dishesData: SingleDish[],
    setDishesData: any
    orderInfo: orderInfoType
    setOrderInfo: any
    orderHolder: SingleMeal[]
    setOrderHolder: any
}

const Step_3: React.FC<Props> = ({ dishesData,setDishesData, orderInfo, setOrderInfo, orderHolder, setOrderHolder }) => {

    const [dish,setDish] = useState<string[]|[]>([])
    const [amount,setAmount] = useState<number>(1);
    const [displayMealChoices, setDisplayMealChoices] = useState<any[]>([<option>test</option>])
    const [remainder, setRemainder] = useState<number>(10)

    let amountAdjuster = (e:any) =>{
        let newArr = [...orderHolder];
        for(let i in newArr){
          if(newArr[i].dish === e.target.id){
            newArr[i].amount = e.target.value
             setOrderHolder([...newArr])
          }
        }
    };

    let amountUpdate = (e:any) => {
        setAmount(e.target.value)
      };

    let dishChangeHandler = (e:any) => {
        setDish(e.target.value)
    };

    let dishPop = (e:any) => {
        let filteredMeals = displayMealChoices.filter((dish)=>{
          if(dish.props.value !== e.target.value){
            return dish
          };
        });
        setDisplayMealChoices([...filteredMeals]);
      }
    
      let itemCountNotOverTen = () =>{
        let arrayTotal = orderHolder.map((item)=>{return Number(item.amount)});
        let sumOfitems = arrayTotal.reduce((a,b)=> a + b, 0)
        let remain = remainder - sumOfitems
        setRemainder(remain)
        return sumOfitems
      }

    let addButtonHandler = (e:any) => {
        if(!dish[0]){
            return
        };
        if(itemCountNotOverTen() < 10){
          let dishObj = {dish:dish, amount:amount};
          setOrderHolder([...orderHolder,dishObj]);
          dishPop(e);
          setDish([])
        }else{
          alert("too many items in order, please select only 10 items")
        }
      };

      let itemCreate = orderHolder.map((item)=>{
        return (<div id="item-row" className="flex">
                  <div className="w-3/4 justify-center">{item.dish}</div>
                  <div className="inline pr-16">
                    <input max={remainder} type="number" id={item.dish} value={item.amount} onChange={amountAdjuster} onClick={itemCountNotOverTen} className="justify-center bg-white border border-gray-400 hover:border-gray-500  w-1/4 rounded shadow leading-tight focus:outline-none focus:shadow-outline" ></input>
                  </div>
                </div>)
        });

      useEffect(() => {
        let filterByMeal = dishesData.filter((dish)=>{
          for(let meals of dish.availableMeals){
            if(meals === orderInfo.category && dish.restaurant === orderInfo.restaurant){
              return true
            };
          };
        });
    
        let mappedMealChoices = filterByMeal.map((r) => {
          return <option value={r.name}>{r.name}</option>
        });
      
        if(!orderHolder[0]){
          console.log("reset")
          setDisplayMealChoices([...mappedMealChoices])
        }else{
          let x = mappedMealChoices.filter((itemTag)=>{
            for(let held of orderHolder){
              if(itemTag.props.value !== held.dish)
              //console.log(itemTag.props.value)
              //console.log(held.dish)
              return itemTag
            }
          });
          //x is not filtering as it should. Need to retool but should be good otherwise
          //console.log(x)
          setDisplayMealChoices([...x])
                //console.log(itemTag.props.value)
                //console.log(orderHolder)
        };
      },[])

    return (
        <div>
        <div id="meal-box" className="flex pb-10">
            <div id="foodChoice" className="">
                <h3 className="py-3 px-8">Please select a dish</h3>
                <label>
                    <select value={dish} onChange={dishChangeHandler} className="appearance-none w-3/4 inline bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value=''>---</option>
                        {displayMealChoices}
                    </select>
                </label>
            </div>
            <div id="amount" className="">
                <h3 className="py-3">Please enter amount</h3>
                <input type="number" min="1" max={remainder} value={amount} onChange={amountUpdate} className="appearance-none w-[35] inline bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"></input>
            </div>
            <div id="addFood-button" className="">
                <h3 className="py-2 mt-1 px-10">Click to add</h3>
              <button onClick={addButtonHandler} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" value={dish}>+</button>
            </div>
        </div>
        <div id="fullItemList" className="">
            <h3 className="underline pb-5">Items in your order list</h3>
            <div id="items-list" className="">
            {itemCreate}
            </div>
        </div>
      </div>
    )
};

export default Step_3