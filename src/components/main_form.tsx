import { useEffect, useState } from "react";
import dishes from "../data/dishes.json";
import { orderInfoType, SingleDish, SingleMeal } from "../globals";
import Step_1 from "./step_1";
import Step_2 from "./step_2";
import Step_3 from "./step_3";
import Step_4 from "./step_4";
import Step_5 from "./step_5";
import ProgressBar from "./progress_bar";



const MainFormPage: React.FC = () => {

    const [step, setStep] = useState<number>(0);
    const [dishesData,setDishesData] = useState<SingleDish[] | []>([])
    const [orderInfo, setOrderInfo] = useState<orderInfoType>({
        category:"",
        numOfPeople:1,
        restaurant:"",
        meals:[],
    });
    const [orderHolder, setOrderHolder] = useState<SingleMeal[] | []>([]);

    useEffect(() => {
        setDishesData(dishes.dishes)
    },[]);

    const nextButtonHandler = () => {
        if(step === 0){
            setStep(step + 1)
        }else if(step === 1){
            if(orderInfo.category !== ""){
                setStep(step + 1);
            }else{
                setStep(1)
            };
        }else if(step === 2){
            if(orderInfo.restaurant !== ""){
                setStep(step + 1);
            }else{
                setStep(2)
            }
        }else if(step === 3){
            let arrayTotal = orderHolder.map((item)=>{return Number(item.amount)});
            let sumOfitems = arrayTotal.reduce((a,b)=> a + b, 0)
            if(!orderHolder[0]){
                alert("Please add items to your order")
                setStep(3)
            }else if(sumOfitems < orderInfo.numOfPeople){
                //console.log(orderHolder.length)
                //console.log(orderInfo.numOfPeople)
                alert("Please add at least one item per person to your order")
            }else{
                setStep(step + 1);
            };
        }else if(step === 4){
            setStep(step + 1)
        }else if(step=== 5){
            setStep(0)
        }else{
            setStep(step + 1)
        }
    };

    const backButtonHandler = () => {
        setStep(step - 1)
        //console.log(dishesData)
    };

    const conditionalButtonStepper = (step:number) => {
        if(step === 1){
            return <Step_1 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo} orderHolder={orderHolder} setOrderHolder={setOrderHolder}/>
        }else if(step ===2){
            return <Step_2 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo} orderHolder={orderHolder} setOrderHolder={setOrderHolder}/>
        }else if(step ===3){
            return <Step_3 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo} orderHolder={orderHolder} setOrderHolder={setOrderHolder}/>
        }else if(step === 4){
            return <Step_4 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo} orderHolder={orderHolder} setOrderHolder={setOrderHolder}/>
        }else if(step === 5 ){
            return <Step_5 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo} orderHolder={orderHolder} setOrderHolder={setOrderHolder}/>
        }else return
    };

    const ButtonDisplay = () => {
        if(step === 0){
            return "Start"
        }else if(step === 4){
            return "Submit"
        }else if(step === 5){
            return "Home"
        }else{
            return "Next"
        }
    };

    const BackButtonDisplay = () => {
        if(step === 0 || step === 5){
            return <button id="backButton" className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-40 cursor-not-allowed">Back</button>
        }else{
            return <button id="backButton" className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{backButtonHandler()}}>Back</button>
        }
    };

    return(
        <div>
            <div className="flex-inline">
                <div id="future-header" className="py-4">
                    <ProgressBar step={step}/>
                </div>
                <div id='FullFormDiv' className="pt-6 flex-col inline-flex justify-center sm:w-2/4 m:w-3/4 max-w-md md:h-[500px] lg:h-[500px] sm:h-[300px] border-4">
                    <div className="content-center">
                        {conditionalButtonStepper(step)}
                    </div>
                    <div id="button-row" className="mt-auto">
                        <div className="px-12 py-6 inline-flex">
                        {BackButtonDisplay()}
                        </div>
                        <div id="nextButton" className="px-12 py-6 inline-flex">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded just" onClick={()=>{nextButtonHandler()}}>
                                {ButtonDisplay()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MainFormPage